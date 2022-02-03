import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpResponse } from 'src/app/common/models/http-response.model';
import { ApiService } from 'src/app/common/services/api.service';
import { EventBusService } from 'src/app/global/event-bus.service';
import { LocationNotFoundDialogComponent } from './location-not-found-dialog/location-not-found-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  address: string;

  constructor(
    private eventBusService: EventBusService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.openDialog("", false);
  }

  public expandFilterMenu() {
    const currentState = this.eventBusService.expandFiltersPanel.getValue();
    this.eventBusService.expandFiltersPanel.next(!currentState)
  }

  public searchForLocation() {
    this.apiService
      .setResource('BingMaps')
      .get<Location>({ query: this.address })
      .subscribe({
        next: response => this.handleLocationFound(response),
        error: (error) => this.openDialog(error.message, true),
    });
  }

  private openDialog(message: string, isError: boolean = false): void {
    const dialogRef = this.dialog.open(LocationNotFoundDialogComponent, {
      width: '300px',
      height: '250px',
      data: {
        message: message,
        isError: isError
      },
    });
  }

  private handleLocationFound(response: HttpResponse<Location>) {
    console.log("response", response);
    if (response.count == 0 || response.data.length == 0) {
      this.openDialog("", false);
    };
    
  }
}
