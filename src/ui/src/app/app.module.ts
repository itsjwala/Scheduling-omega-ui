import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginModule } from './login/login.module';
import { InterviewerModule } from './interviewer/interviewer.module'
import { HrModule } from './hr/hr.module'

import { HrRoutingModule } from './hr/hr-routing.module';
import { InterviewerRoutingModule } from './interviewer/interviewer-routing.module';
import { LoginRoutingModule } from './login/login-router.module';
import { DashComponent } from './dash/dash.component';


@NgModule({
  declarations: [
    AppComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    InterviewerModule,
    HrModule,
    BrowserAnimationsModule,
    NgbModule,
    HrRoutingModule,
    LoginRoutingModule,
    InterviewerRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
