import { AuthService } from './../auth.service';
import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  preferencesForm: FormGroup;
  filteredOptionsTech = [];
  filteredOptionsLevel = [];
  techs = [];
  levels = [];

  constructor(private fb: FormBuilder, private http: HttpClient,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.preferencesForm = this.fb.group({
      technology: ['', Validators.required],
      levels: ['', Validators.required]
    });

    this.http.get(AppConstants.getLevelsURL).subscribe((e: any) => {
      this.filteredOptionsLevel = e;
    })


    this.http.get(AppConstants.getTechsURL).subscribe((e: any) => {
      this.filteredOptionsTech = e;
    })
  }

  getTech(tech) {
    // this.techs.push(tech);
    this.filteredOptionsTech.map(e => {
      if (e.technology === tech)
        this.techs.push({
          'id': e.id,
          'technology': tech
        });
    }); this.http.get(AppConstants.getLevelsURL).subscribe((e: any) => {
      this.filteredOptionsLevel = e;
    })

    AuthService
    this.http.get(AppConstants.getTechsURL).subscribe((e: any) => {
      this.filteredOptionsTech = e;
    })
  }

  getLevel(level) {
    // this.levels.push(level);
    this.filteredOptionsLevel.map(e => {
      if (e.level === level)
        this.levels.push({
          'id': e.id,
          'level': level
        });
    })
  }

  preferencesFormSubmit(event) {
    event.preventDefault();
    const preferences = {
        'levels': this.levels,
        'technologies': this.techs
    }

    console.log(preferences);
    this.authService.addInterviewer(preferences);
    this.router.navigate(['']);
  }

}
