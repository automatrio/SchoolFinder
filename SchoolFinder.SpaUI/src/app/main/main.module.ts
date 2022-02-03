import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingMapComponent } from '../common/bing-map/bing-map.component';
import { HomeComponent } from './home/home.component';
import { SchoolsTableComponent } from './schools-table/schools-table.component';
import { AngularMaterialModule } from '../common/angular-material.module';
import { MainRoutingModule } from './main.routing.module';
import { AngularCommomModule } from '../common/angular-commom.module';


@NgModule({
  declarations: [
    BingMapComponent,
    HomeComponent,
    SchoolsTableComponent,
  ],
  imports: [
    CommonModule,
    AngularCommomModule,
    AngularMaterialModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
