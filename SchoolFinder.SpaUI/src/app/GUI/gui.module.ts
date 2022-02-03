import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { FooterComponent } from './footer/footer.component';
import { SchoolExplorerComponent } from './school-explorer/school-explorer.component';
import { CommonSharedModule } from '../common/common-shared.module';
import { AngularMaterialModule } from '../common/angular-material.module';



@NgModule({
  declarations: [
    FiltersPanelComponent,
    SchoolExplorerComponent,
    LogoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    AngularMaterialModule
  ],
  exports: [
    FiltersPanelComponent,
    SchoolExplorerComponent,
    LogoComponent,
    FooterComponent
  ]
})
export class GUIModule { }
