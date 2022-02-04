import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BingApiLoaderService } from 'src/app/common/bing-map/services/bing-api-loader.service';
import { EventBusService } from 'src/app/global/event-bus.service';
import { School } from 'src/app/main/schools-table/models/school.view-model';
import { SchoolExplorerFieldsService } from './services/school-explorer-fields.service';

@Component({
  selector: 'app-school-explorer',
  templateUrl: './school-explorer.component.html',
  styleUrls: ['./school-explorer.component.scss']
})
export class SchoolExplorerComponent implements AfterViewInit {

  mapLoaded: Observable<boolean>;
  schoolToExplore: Observable<School>;

  constructor(
    private bingApiLoaderService: BingApiLoaderService,
    private eventBusService: EventBusService,
    public fieldsService: SchoolExplorerFieldsService) {
      this.mapLoaded = eventBusService.mapLoaded.asObservable();
      this.schoolToExplore = eventBusService.schoolToExplore.asObservable();
      eventBusService.schoolToExplore.subscribe(school => {
        this.fieldsService.fillOutForm(school);
      })
    }

  ngAfterViewInit(): void {
    this.bingApiLoaderService.load().then(() => {
      this.eventBusService.mapLoaded.next(true);
    });
  }

}
