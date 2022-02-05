import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CarrouselData } from './models/carrousel-data.view-model';

export let direction = {
  left: 40,
  center: 0,
  right: -40
};

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('enterLeave', [
      transition(':enter', [
        style({ filter: 'blur(5px)', opacity: 0 }),
        animate('200ms', style({ filter: 'blur(0px)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ filter: 'blur(5px)', opacity: 0 })),
      ])
    ]),
  ]
})
export class CarrouselComponent implements OnInit {

  currentItemIndex: number = 0;

  @Input() carrouselData: CarrouselData[];
  @Output() change = new EventEmitter<CarrouselData>();

  @HostBinding("style.--carrousel__color") color: string;

  constructor() { }

  ngOnInit(): void {
    this.assignColor();
  }

  changeCurrentItemIndex(value: number) {
    this.currentItemIndex += value;
    this.currentItemIndex %= (this.carrouselData.length);
    this.currentItemIndex = Math.abs(this.currentItemIndex);
    this.assignColor();
    this.change?.emit(this.carrouselData[this.currentItemIndex]);
  }

  assignColor = () => this.color = this.carrouselData[this.currentItemIndex].color;

}
