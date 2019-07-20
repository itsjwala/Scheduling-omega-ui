import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith,map} from 'rxjs/operators'



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  levels=[]
  technologies = []
  filteredInterviewerNames : Observable<String[]>
  interviewerNames=[]
  filterForm:FormGroup;
  errors={}

  constructor(private filterService:FilterService,private fb:FormBuilder) { }

  ngOnInit() {
    this.levels=this.filterService.getLevels();
    this.technologies = this.filterService.getTechnologies();
    this.interviewerNames = this.filterService.getInterviewerNames();



    this.filterForm = this.fb.group({
      "interviewerName": [''],
      "levelFields":[''],
      "technologyFields":[''],
      "scheduled":['']
    });

    this.filteredInterviewerNames = this.filterForm.get("interviewerName").valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  applyFilter(e){
    e.preventDefault();

    let formValue = this.filterForm.value;
    if (formValue.interviewerName && !this.interviewerNames.find(e => e.name === formValue.interviewerName)){
      this.errors["interviewerRequired"] = "select name from option"
      return;
    }
    else
      delete this.errors["interviewerRequired"]





    console.log(this.filterForm.value);


  }
  clearFilter(e){
    e.preventDefault();



    this.filterForm.reset();
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.interviewerNames.filter(o => o.name.toLowerCase().includes(filterValue));
  }





}
