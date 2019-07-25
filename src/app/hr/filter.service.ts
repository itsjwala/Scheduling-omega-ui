import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {

  }
  filterEventSubject :Subject<any> = new Subject();

  getTechnologies() {

    return this.http.get(AppConstants.getTechsURL);
  }

  getLevels() {

    return this.http.get(AppConstants.getLevelsURL);
  }
  getInterviewerNames() {
    return this.http.get(AppConstants.getInterviewerNamesURL);
  }
  setFilters(filterForm){
    // console.log(filterForm);

    this.filterEventSubject.next(filterForm);

  }

}
