import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/global/event-bus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  address: string;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  public expandFilterMenu() {
    const currentState = this.eventBusService.expandFiltersPanel.getValue();
    this.eventBusService.expandFiltersPanel.next(!currentState)
  }

}
