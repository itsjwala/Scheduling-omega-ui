import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashComponent } from './dash/dash.component';

const hrRoutes: Routes = [
    {
        path: 'hr',
        component: DashComponent,
        children:
            [

            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(hrRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HrRoutingModule { }
