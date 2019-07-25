import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators'



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  levels = []
  technologies = []
  filteredInterviewerNames: Observable<String[]>
  interviewerNames = []
  filterForm: FormGroup;
  errors = {}

  constructor(private filterService: FilterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.filterService.getLevels().subscribe((e: any) => {
      this.levels = e;
    })

    this.filterService.getTechnologies().subscribe((e: any) => {
      this.technologies = e;
    })

    this.filterService.getInterviewerNames().subscribe((e: any) => {
      this.interviewerNames = e;
    })



    this.filterForm = this.fb.group({
      "interviewerName": [''],
      "levelFields": [''],
      "technologyFields": [''],
      "scheduled": ['']
    });

    this.filteredInterviewerNames = this.filterForm.get("interviewerName").valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  applyFilter(e) {
    e.preventDefault();

    let formValue = this.filterForm.value;
    if (formValue.interviewerName && !this.interviewerNames.find(e => e.interviewerName === formValue.interviewerName)) {
      this.errors["interviewerRequired"] = "select name from option"
      return;
    }
    else
      delete this.errors["interviewerRequired"]
    // if(formValue.interviewerName)

    if (!formValue.interviewerName && (!formValue.levelFields) && (!formValue.technologyFields) && (formValue.scheduled !== true))
      this.filterService.setFilters(null);
    else
      this.filterService.setFilters(formValue);

  }
  clearFilter(e) {
    e.preventDefault();

    this.filterForm.reset();
    this.filterService.setFilters(null);
  }


  private _filter(value: any): string[] {
    if (value) {
      const filterValue = value.toLowerCase();

      return this.interviewerNames.filter(o => o.interviewerName.toLowerCase().includes(filterValue));
    }
  }





}
