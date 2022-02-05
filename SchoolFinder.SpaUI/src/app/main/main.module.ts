import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingMapComponent } from '../common/bing-map/bing-map.component';
import { HomeComponent } from './home/home.component';
import { SchoolsTableComponent } from './schools-table/schools-table.component';
import { AngularMaterialModule } from '../common/angular-material.module';
import { MainRoutingModule } from './main.routing.module';
import { AngularCommomModule } from '../common/angular-commom.module';
import { LocationNotFoundDialogComponent } from './home/location-not-found-dialog/location-not-found-dialog.component';
import { SchoolService } from './schools-table/services/school.service';


@NgModule({
  declarations: [
    HomeComponent,
    SchoolsTableComponent,
    LocationNotFoundDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularCommomModule,
    AngularMaterialModule,
    MainRoutingModule,
  ],
  providers: [
    SchoolService
  ]
})
export class MainModule { }
