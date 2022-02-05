import { Component, OnInit } from '@angular/core';
import { CarrouselData } from 'src/app/common/carrousel/models/carrousel-data.view-model';
import { EventBusService } from 'src/app/global/services/event-bus.service';
import { SchoolAdministrativeDepartment } from './models/school-administrative-department.view-model';
import { SchoolType } from './models/school-type.view-model';
import { FiltersPanelService } from './services/filters-panel.service';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {

  filter = {
    maxDistance: 100
  };

  schoolTypes: CarrouselData[];
  schoolAdministrativeDepartments: CarrouselData[];

  constructor(
    private eventBusService: EventBusService,
    private filtersPanelService: FiltersPanelService) {
      this.getAdministrativeDepartments();
      this.getSchoolTypes();
  }

  ngOnInit(): void {
  }

  public dismissFiltersPanel() {
    this.eventBusService.expandFiltersPanel.next(false);
  }

  public formatLabel(value: number) {
    return value + 'km';
  }

  public onFilterSelected(data: CarrouselData, type: 'SchoolType'|'AdministrativeDepartment') {
    const selector = "filter" + type;
    this.eventBusService[selector].next(data);
  }

  public onMaxDistanceSelected() {
    this.eventBusService.filterMaxDistance.next(this.filter.maxDistance);
  }

  private getSchoolTypes() {
    this.filtersPanelService
      .getSchoolTypes()
      .subscribe(response => {
        this.schoolTypes = response.data as CarrouselData[];
      });
  }

  private getAdministrativeDepartments() {
    this.filtersPanelService
      .getSchoolAdministrativeDepartments()
      .subscribe(response => {
        this.schoolAdministrativeDepartments = response.data as CarrouselData[];
      });
  }

}
