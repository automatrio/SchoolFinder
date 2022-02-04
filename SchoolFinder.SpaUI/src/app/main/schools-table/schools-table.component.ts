import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/common/services/api.service';
import { EventBusService } from 'src/app/global/event-bus.service';
import { School } from './models/school.view-model';

@Component({
  selector: 'app-schools-table',
  styleUrls: ['schools-table.component.scss'],
  templateUrl: 'schools-table.component.html',
})
export class SchoolsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ["name", "address", "distance", "seeMap"];
  dataSource: MatTableDataSource<School>;
  itemCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventBusService: EventBusService) {
    this.initializeTableAndExplorer();
  }

  ngAfterViewInit() {
    this.eventBusService.expandSchoolExplorer.next(true);
    this.dataSource.paginator = this.paginator;
  }

  public onPageChange(event: PageEvent) {
    
  }

  private initializeTableAndExplorer() {
    this.eventBusService.nearestSchools.subscribe(response => {
      this.itemCount = response.count;
      this.dataSource = new MatTableDataSource(response.data);
      this.eventBusService.schoolToExplore.next(response.data[0]);
    });
  }
}