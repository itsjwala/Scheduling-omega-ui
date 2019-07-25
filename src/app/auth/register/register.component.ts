import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  token: string;
  filteredOptions = ['HR', 'Interviewer'];
  role: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      wissenId: ['', Validators.required],
      phoneNum: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.token = this.authService.getToken();


    // this.authService.getAuthStream()
    //   .subscribe((e: any) => {
    //     // localStorage.setItem('id_token', this.token);
    //     // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    //   });
  }



    // console.log(this.registerForm.get('password').errors);


  registerUser(event) {
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.register(this.registerForm);
    this.router.navigate(['']);
  }

  addPreferences(event){
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.register(this.registerForm);
    this.router.navigate(['preferences']);
  }

  getRole(role) {
    this.role = role;
  }

}
