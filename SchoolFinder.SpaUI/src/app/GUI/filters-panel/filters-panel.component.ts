import { Component, OnInit } from '@angular/core';
import { CarrouselData } from 'src/app/common/carrousel/models/carrousel-data.view-model';
import { EventBusService } from 'src/app/global/event-bus.service';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit {

  schoolTypes: CarrouselData[] = [{
    imageSrc: "family_restroom",
    title: "Todos os Níveis",
    color: "#8c00ff"
  }, {
    imageSrc: "child_care",
    title: "Educação Infantil",
    color: "#6bc8ffa6"
  }, {
    imageSrc: "toys",
    title: "Ensino Fundamental",
    color: "#edff26"
  }, {
    imageSrc: "smart_toy",
    title: "Ensino Médio",
    color: "#14ff14"
  }];

  schoolPaymentOptions: CarrouselData[] = [{
    imageSrc: "groups",
    title: "Todos os Setores",
    color: "#ff3333"
  }, {
    imageSrc: "account_balance",
    title: "Público",
    color: "#ff8f14"
  }, {
    imageSrc: "savings",
    title: "Privado",
    color: "#ff33ee"
  }];

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  public dismissFiltersPanel() {
    this.eventBusService.expandFiltersPanel.next(false);
  }

}
