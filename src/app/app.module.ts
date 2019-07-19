import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { HrModule } from './hr/hr.module';
import {CommonsModule} from './commons/commons.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HrRoutingModule } from './hr/hr-routing.module';
import {CommonsRoutingModule} from './commons/commons-routing.module';
import { InterviewerRoutingModule } from './interviewer/interviewer-routing.module';
import { LoginRoutingModule } from './login/login-router.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    HttpClientModule,
    InterviewerModule,
    HrModule,
    CommonsModule,
    BrowserAnimationsModule,
    NgbModule,
    HrRoutingModule,
    LoginRoutingModule,
    CommonsRoutingModule,
    InterviewerRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
