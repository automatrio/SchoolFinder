import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from 'src/app/global/services/event-bus.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(private router: Router, private eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  public redirectToHomepage() {
    this.eventBusService.expandFiltersPanel.next(false);
    this.eventBusService.expandSchoolExplorer.next(false);
    this.router.navigateByUrl("/");
  }

}
