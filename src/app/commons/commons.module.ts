import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';


import { AboutViewComponent } from './about-view/about-view.component';
import { HomeComponent } from './home/home.component';
import { PreviousScheduleComponent } from './previous-schedule/previous-schedule.component';
import { SmallCalendarComponent } from './small-calendar/small-calendar.component';
import { BigCalendarComponent } from './big-calendar/big-calendar.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarInteractionService } from './calendar-interaction.service';
import { MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { ShowSnackBarService } from './show-snack-bar.service';
import { FilterService } from '../hr/filter.service';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HomeComponent,
    PreviousScheduleComponent,
    AboutViewComponent,
    SmallCalendarComponent,
    BigCalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    NgxSpinnerModule,
    AgGridModule.withComponents([]),

  ],
  exports:[
    SmallCalendarComponent,
    BigCalendarComponent,
    // CalendarInteractionService
  ],
  providers:[
    ShowSnackBarService,
    FilterService
  ]
})
export class CommonsModule { }
