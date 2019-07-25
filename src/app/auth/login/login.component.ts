import { Roles } from '../../models/Role';
import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role: Roles;
  loginForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private showsnack:ShowSnackBarService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.token = this.authService.getToken();


    // this.authService.getAuthStres
    //   .subscribe((e: any) => {res
    //     // localStorage.setItem('id_token', this.token);
    //     // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    //   });
  }

    // console.log(this.registerForm.get('password').errors);


  loginUser(event) {
    event.preventDefault();
    this.spinner.show();
    this.authService.login(this.loginForm).subscribe(res =>{

      this.spinner.hide();
      this.authService.setSession(res);

    }
    ,
    error => {
      this.spinner.hide();
      this.showsnack.openSnackBar("Enter valid credentials");
    });



    // this.router.navigate(['']);
  }

  addPreferences(event){
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.login(this.loginForm);

  }

  getRole(role) {
    this.role = role;

  }
}
