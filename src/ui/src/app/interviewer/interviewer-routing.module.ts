import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { DashComponent } from './dash/dash.component';

const interviewerRoutes: Routes = [
    {
        path: 'interviewer',
        component: DashComponent,
        children:
            [
                { path: '', component: CalendarComponent }
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(interviewerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class InterviewerRoutingModule { }
