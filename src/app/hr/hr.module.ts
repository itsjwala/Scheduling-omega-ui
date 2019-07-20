import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { DashComponent } from './dash/dash.component';
import { CommonsModule } from '../commons/commons.module';



@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    DialogModule,
    CommonsModule,
    MatDialogModule
  ],
  exports: [

  ]
})
export class HrModule { }
