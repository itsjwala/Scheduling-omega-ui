import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private spinner:NgxSpinnerService,private showsnack:ShowSnackBarService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      wissenId: ['', Validators.required],
      phoneNum: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });

    // this.token = this.authService.getToken();


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
    this.spinner.show();
    this.authService.register(this.registerForm).subscribe(res =>{

      this.spinner.hide();
      this.authService.setSession(res)

      this.router.navigate(['login']);

    },error=>{
      this.spinner.hide();
      this.showsnack.openSnackBar("Problem registering")
      console.log(error);
    })
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
