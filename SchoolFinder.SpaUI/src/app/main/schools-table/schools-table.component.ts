import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/common/services/api.service';
import { EventBusService } from 'src/app/global/event-bus.service';
import { School } from './models/school.view-model';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-schools-table',
  styleUrls: ['schools-table.component.scss'],
  templateUrl: 'schools-table.component.html',
})
export class SchoolsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ["name", "address", "distance", "seeMap"];
  dataSource: MatTableDataSource<School>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private eventBusService: EventBusService) {
    this.eventBusService.foundLocationCoordinates.subscribe(coords => {
      const users = this.getSchoolInfosAndDistance(coords).then(schools => {
        this.dataSource = new MatTableDataSource(schools);
      });  
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getSchoolInfosAndDistance(coordinates: number[]) {
    return new Promise<School[]>(resolve => {
      this.apiService
      .setResource("School")
      .get<School>({ latitude: coordinates[0], longitude: coordinates[1] })
      .subscribe(response => {
        resolve(response.data);
      });
    });
  }
}