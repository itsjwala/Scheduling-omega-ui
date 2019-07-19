import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';


import { AboutViewComponent } from './about-view/about-view.component';
import { HomeComponent } from './home/home.component';
import { PreviousScheduleComponent } from './previous-schedule/previous-schedule.component';

@NgModule({
  declarations: [
    HomeComponent,
    PreviousScheduleComponent,
    AboutViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class CommonsModule { }
