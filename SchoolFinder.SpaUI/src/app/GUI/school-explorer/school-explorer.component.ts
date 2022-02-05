import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BingApiLoaderService } from 'src/app/common/bing-map/services/bing-api-loader.service';
import { EventBusService } from 'src/app/global/services/event-bus.service';
import { School } from 'src/app/main/schools-table/models/school.view-model';
import { SchoolService } from 'src/app/main/schools-table/services/school.service';
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
    private schoolService: SchoolService,
    public fieldsService: SchoolExplorerFieldsService) {
      this.mapLoaded = eventBusService.mapLoaded.asObservable();
      this.schoolToExplore = eventBusService.schoolToExplore.asObservable();
      eventBusService.schoolToExplore.subscribe(school => {
        this.schoolService.getOne(school.id).subscribe(response => {
          this.fieldsService.fillOutForm(response.data[0]);
        });
      });
    }

  ngAfterViewInit(): void {
    this.bingApiLoaderService.load().then(() => {
      this.eventBusService.mapLoaded.next(true);
    });
  }

  public dismissSchoolExplorer() {
    this.eventBusService.expandSchoolExplorer.next(false);
  }

}
