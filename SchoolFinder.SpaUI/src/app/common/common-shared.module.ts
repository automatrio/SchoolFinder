import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CarrouselTriangleComponent } from './carrousel/carrousel-triangle/carrousel-triangle.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CarrouselComponent,
    CarrouselTriangleComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    CarrouselComponent
  ]
})
export class CommonSharedModule { }
