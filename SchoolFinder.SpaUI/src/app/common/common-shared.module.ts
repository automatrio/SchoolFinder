import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CarrouselTriangleComponent } from './carrousel/carrousel-triangle/carrousel-triangle.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { BingMapComponent } from './bing-map/bing-map.component';
import { LocationNotFoundDialogComponent } from './dialogs/location-not-found-dialog.component';
import { WelcomeDialogComponent } from './dialogs/welcome-dialog.component';



@NgModule({
  declarations: [
    CarrouselComponent,
    CarrouselTriangleComponent,
    BingMapComponent,
    LocationNotFoundDialogComponent,
    WelcomeDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    CarrouselComponent,
    BingMapComponent,
    LocationNotFoundDialogComponent,
    WelcomeDialogComponent
  ]
})
export class CommonSharedModule { }
