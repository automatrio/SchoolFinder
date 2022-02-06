import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EventBusService } from './global/services/event-bus.service';
import { School } from './main/schools-table/models/school.view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'SchoolFinder';
  expandFiltersPanel: Observable<boolean>;
  expandSchoolExplorer: Observable<boolean>;
  schoolToExplore: Observable<School|null>;

  constructor(private eventBusService: EventBusService) {
    this.expandFiltersPanel = this.eventBusService.expandFiltersPanel.asObservable();
    this.expandSchoolExplorer = this.eventBusService.expandSchoolExplorer.asObservable();
    this.schoolToExplore = this.eventBusService.schoolToExplore.asObservable();
  }

  ngAfterViewInit(): void {
  }
}
