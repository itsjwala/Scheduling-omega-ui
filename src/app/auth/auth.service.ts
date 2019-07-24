import { Subject } from 'rxjs';
import { AppConstants } from './../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employee from '../models/Employee';
import * as moment from "moment";
import  Interviewer  from '../models/interviewer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //role and auth code here
  token: string;
  employee: Employee;
  interviewer: Interviewer;
  authStream = new Subject();
  constructor(private http: HttpClient) { }


  getToken() {
    return this.token;
  }

  getEmployeeId() {
    // return 1;
    return 5;
  }

  getAuthStream() {
    return this.authStream;
  }

  addEmployee(registerForm) {
    let { name, email, wissenId, phoneNum } = registerForm.value;
    this.employee = new Employee(email, name, wissenId, phoneNum);
    console.log(this.employee);

    this.http.post(AppConstants.addEmployee, this.employee)
      .subscribe(e => {
        this.authStream.next(e);
      });
  }

  addInterviewer(preference){
    console.log(this.employee);
    this.interviewer = new Interviewer();
    this.interviewer.setEmployee = this.employee;
    this.interviewer.setLevel = preference.levels;
    this.interviewer.setTechnology = preference.technologies;

    console.log(this.interviewer);
    return this.http.post(AppConstants.addInterviewer, this.interviewer)
      .subscribe(res => this.setSession)
  }

  login(registerForm) {
    let { name, email, wissenId, phoneNum } = registerForm.value;
    this.employee = new Employee(email, name, wissenId, phoneNum);
    console.log(this.employee);
    return this.http.post(AppConstants.addEmployee, this.employee)
      .subscribe(res => this.setSession)
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

