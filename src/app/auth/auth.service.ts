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

  id :number;
  role:string;
  employee: Employee;
  interviewer: Interviewer;
  // authStream = new Subject();
  constructor(private http: HttpClient) { }


  getToken() {
    return this.token;
  }

  getEmployeeId() {
    // return 1;
    return this.id;
  }

  getRole(){
    return this.role;
  }



  addInterviewer(preference){
    console.log(this.employee);
    this.interviewer = new Interviewer();
    this.interviewer.setEmployee = this.employee;
    this.interviewer.setLevel = preference.levels;
    this.interviewer.setTechnology = preference.technologies;

    console.log(this.interviewer);
    this.http.post(AppConstants.addInterviewer, this.interviewer)
      .subscribe(res => this.setSession(res))
  }

  login(registerForm) {
    let { name, email, wissenId, phoneNum, role, password } = registerForm.value;
    this.employee = new Employee(email, name, wissenId, phoneNum, role.toUpperCase());
    console.log(this.employee);
    this.http.post(AppConstants.addEmployee, { ...this.employee, password: password})
      .subscribe(res => this.setSession(res))
  }

  private setSession(authResult) {

    let claim = this.decodeJwt(authResult.token);
    console.log(claim);
    this.id = claim.id;
    this.role = claim.role;

    const expiresAt = moment().add(claim.exp, 'milliseconds');

    localStorage.setItem('id', ""+this.id);
    localStorage.setItem("exp", ""+expiresAt.valueOf());
  }

  private decodeJwt(token){
    console.log(token)
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("exp");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("exp");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

