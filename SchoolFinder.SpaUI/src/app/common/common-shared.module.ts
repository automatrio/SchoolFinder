import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CarrouselTriangleComponent } from './carrousel/carrousel-triangle/carrousel-triangle.component';
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  declarations: [
    CarrouselComponent,
    CarrouselTriangleComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    CarrouselComponent
  ]
})
export class CommonSharedModule { }
