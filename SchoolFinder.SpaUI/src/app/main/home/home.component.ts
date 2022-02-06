import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PushpinFactory } from 'src/app/common/helpers/pushpin-factory.helper';
import { GeoLocation } from 'src/app/common/models/geo-location.model';
import { HttpResponse } from 'src/app/common/models/http-response.model';
import { ApiService } from 'src/app/common/services/api.service';
import { EventBusService } from 'src/app/global/services/event-bus.service';
import { ToastService } from 'src/app/global/services/toast.service';
import { SchoolService } from '../schools-table/services/school.service';
import { LocationNotFoundDialogComponent } from '../../common/dialogs/location-not-found-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  address: string;

  constructor(
    private eventBusService: EventBusService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router) { }

  ngAfterViewInit(): void {
    const isFirstTime = localStorage.getItem("firstTime");
    if (!isFirstTime) {
      this.toastService.openWelcomeDialog();
      localStorage.setItem("firstTime", "false");
    }
  }

  public expandFilterMenu() {
    const currentState = this.eventBusService.expandFiltersPanel.getValue();
    this.eventBusService.expandFiltersPanel.next(!currentState)
  }

  public searchForLocation() {
    this.apiService
      .setResource('BingMaps')
      .get<GeoLocation>({ query: this.address })
      .subscribe({
        next: response => this.handleLocationFound(response),
        error: (error) => this.toastService.openErrorDialog(error.message, true),
    });
  }

  private handleLocationFound(response: HttpResponse<GeoLocation>) {
    if (response.count == 0 || response.data.length == 0) {
      this.toastService.openErrorDialog("", false);
      return;
    };
    // handle multiple possible locations
    const coords = response.data[0].point.coordinates;
    this.eventBusService.foundLocationCoordinates.next(coords);
    this.eventBusService.expandFiltersPanel.next(false);
    this.router.navigateByUrl("/schools-table");
  }
}
