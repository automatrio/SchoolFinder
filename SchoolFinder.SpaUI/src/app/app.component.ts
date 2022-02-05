import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EventBusService } from './global/services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'SchoolFinder';
  expandFiltersPanel: Observable<boolean>;
  expandSchoolExplorer: Observable<boolean>;

  constructor(private eventBusService: EventBusService) {
    this.expandFiltersPanel = this.eventBusService.expandFiltersPanel.asObservable();
    this.expandSchoolExplorer = this.eventBusService.expandSchoolExplorer.asObservable();
  }

  ngAfterViewInit(): void {
  }
}
