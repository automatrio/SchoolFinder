import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SchoolsTableComponent } from "./schools-table/schools-table.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'schools-table', component: SchoolsTableComponent },
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
})
export class MainRoutingModule { }