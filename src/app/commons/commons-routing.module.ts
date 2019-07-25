import { HrReportComponent } from '../admin/hr-report/hr-report.component';
import { AboutViewComponent } from './about-view/about-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PreviousScheduleComponent } from './previous-schedule/previous-schedule.component';
import { FullCalendar, FullCalendarModule } from 'primeng/fullcalendar';
import { ReportsComponent } from '../admin/reports/reports.component';
import { InterviewerReportComponent } from '../admin/interviewer-report/interviewer-report.component';

const commonRoutes: Routes = [
    {
        path: 'profile',
        component: HomeComponent,
        children:
            [
                { path: 'portfolio', component: AboutViewComponent },
                { path: 'previous', component: PreviousScheduleComponent },
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(commonRoutes),
        FullCalendarModule
    ],
    exports: [
        RouterModule
    ]
})
export class CommonsRoutingModule { }
