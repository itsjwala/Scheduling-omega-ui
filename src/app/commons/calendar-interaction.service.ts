import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarInteractionService {

  smallToBigCalendarStream:Subject<any> = new Subject();
  // bigToSmallCalendarStream:Subject<any> = new Subject();

  constructor() { }





}
