import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { UrlTree, UrlSerializer, DefaultUrlSerializer } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [
  //   { provide: UrlSerializer, useClass: CustomUrlSerializer }
  // ],
})
export class AppComponent {
  title = 'Home';
  loggedIn = false;

  constructor(private authService: AuthService){}

  ngOnInit(){

    // this.authService.getAuthStream()
    // .subscribe((e: any) => {
    //   this.loggedIn = e;
    // })
  }
}
