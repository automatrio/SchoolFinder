import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ], exports: [
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class AngularMaterialModule { }
