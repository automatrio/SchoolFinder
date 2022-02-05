import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PushpinFactory } from 'src/app/common/helpers/pushpin-factory.helper';
import { HttpResponse } from 'src/app/common/models/http-response.model';
import { EventBusService } from 'src/app/global/services/event-bus.service';
import { SchoolService } from './services/school.service';
import { School } from './models/school.view-model';

@Component({
  selector: 'app-schools-table',
  styleUrls: ['schools-table.component.scss'],
  templateUrl: 'schools-table.component.html',
})
export class SchoolsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ["name", "address", "distance", "seeMap"];
  dataSource: MatTableDataSource<School>;
  latestPageEvent = {
    pageIndex: 0,
    pageSize: 5,
  } as PageEvent;

  filter = {
    schoolTypeId: 0,
    schoolAdministrativeTypeId: 0
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventBusService: EventBusService, private schoolService: SchoolService) {
    this.supplyExplorerWhenPushpinIsClicked();
    this.eventBusService.filterSchoolType.subscribe(schoolType => {
      this.filter.schoolTypeId = schoolType.id;
    });
    this.eventBusService.filterAdministrativeDepartment.subscribe(adminDep => {
      this.filter.schoolAdministrativeTypeId = adminDep.id;
    });
  }

  async ngAfterViewInit() {
    const coords = this.eventBusService.foundLocationCoordinates.getValue();
    await new Promise<void>(resolve => {
      this.schoolService.getSchoolInfosAndDistance(coords, 0, this.filter).subscribe(response => {
        this.initializeTableAndExplorer(response);
        this.eventBusService.expandSchoolExplorer.next(true);
        resolve();
      });
    });
    this.insertPushpinsFromCurrentPage();
  }

  public async onPageChange(event: PageEvent) {
    this.latestPageEvent = event;
    this.insertPushpinsFromCurrentPage();

    const coords = this.eventBusService.foundLocationCoordinates.getValue();
    await new Promise<void>(resolve => {
      this.schoolService.getSchoolInfosAndDistance(
          coords, 
          event.pageIndex,
          this.filter)
        .subscribe(response => {
          this.initializeTableAndExplorer(response);
          this.eventBusService.expandSchoolExplorer.next(true);
          resolve();
        });
    });
  }

  public focusOnSchool(school: School) {
    this.eventBusService.schoolToExplore.next(school);
  }

  private insertPushpinsFromCurrentPage() {
    const event = this.latestPageEvent;   
    const schools = this.dataSource.data.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
    this.eventBusService.pushPins.next(schools.map(s => PushpinFactory.fromSchool(s)));
  }

  private initializeTableAndExplorer(schools: HttpResponse<School>) {
    const data = this.fillLazyLoadedDataArray(schools);
    this.dataSource = new MatTableDataSource(data as School[]);
    this.dataSource.paginator = this.paginator;
    const currentIndex = this.latestPageEvent.pageIndex * this.latestPageEvent.pageSize;
    this.eventBusService.schoolToExplore.next(data[currentIndex]!);
  }

  private fillLazyLoadedDataArray(schools: HttpResponse<School>) {
    const length = schools.count;
    const lpe = this.latestPageEvent;
    const emptyBefore = Array.from({ length: Math.max(lpe.pageIndex - 1, 0) * lpe.pageSize }, () => null);
    const emptyAfter = Array.from({ length: length - schools.data.length - emptyBefore.length }, () => null);
    const data = [...emptyBefore, ...schools.data, ...emptyAfter];
    console.log("data", data);
    return data;
  }

  private supplyExplorerWhenPushpinIsClicked() {
    this.eventBusService.clickedPushpinSchoolId.subscribe(id => {
      this.schoolService.getOne(id).subscribe(response => {
        this.eventBusService.schoolToExplore.next(response.data[0]);
      });
    });
  }
}