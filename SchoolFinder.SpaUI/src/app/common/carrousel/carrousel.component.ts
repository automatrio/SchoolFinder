import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
  lastDirection: 'left' | 'right' = 'right';

  @Input() carrouselData: CarrouselData[];
  
  @HostBinding("style.--carrousel__color") color: string;

  constructor() { }

  ngOnInit(): void {
    this.assignColor();
  }

  changeCurrentItemIndex(value: number) {
      this.lastDirection = value < 0
        ? 'left'
        : 'right';

    if (value < 0 && this.lastDirection == 'right') {
      [direction.right, direction.left] = [direction.left, direction.right];
    } else if (value > 0 && this.lastDirection == 'left') {
      [direction.right, direction.left] = [direction.left, direction.right];
    }

    this.currentItemIndex += value;
    this.currentItemIndex %= (this.carrouselData.length);
    this.currentItemIndex = Math.abs(this.currentItemIndex);
    this.assignColor();
  }

  assignColor = () => this.color = this.carrouselData[this.currentItemIndex].color;

}
