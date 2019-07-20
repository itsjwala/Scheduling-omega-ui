import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';



import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { DashComponent } from './dash/dash.component';
import { CommonsModule } from '../commons/commons.module';
import { AvailableSlotDialogComponent } from './available-slot-dialog/available-slot-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [DashComponent, AvailableSlotDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    RouterModule,
    DialogModule,
    CommonsModule,
    MatDialogModule
  ],
  exports: [

  ],
  entryComponents:[
    AvailableSlotDialogComponent
  ]

})
export class InterviewerModule { }
