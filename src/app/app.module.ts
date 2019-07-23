import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InterviewerModule } from './interviewer/interviewer.module';
import { HrModule } from './hr/hr.module';
import {CommonsModule} from './commons/commons.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HrRoutingModule } from './hr/hr-routing.module';
import {CommonsRoutingModule} from './commons/commons-routing.module';
import { InterviewerRoutingModule } from './interviewer/interviewer-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpClientModule,
    InterviewerModule,
    HrModule,
    AuthModule,
    CommonsModule,
    BrowserAnimationsModule,
    NgbModule,
    HrRoutingModule,
    AuthRoutingModule,
    CommonsRoutingModule,
    InterviewerRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
