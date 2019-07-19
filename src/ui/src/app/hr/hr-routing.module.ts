import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component'
import { DashComponent } from './dash/dash.component';

const hrRoutes: Routes = [
    {
        path: 'hr',
        component: DashComponent,
        children:
            [
                { path: '', component: CalendarComponent }
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(hrRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HrRoutingModule { }
