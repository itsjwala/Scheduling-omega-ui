import { Injectable } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InterviewerService {

  constructor(private fb: FormBuilder) { }


  initializeEvents() {
    return [
      {
        "title": "All Day Event",
        "start": "2016-01-01"
      },
      {
        "title": "Long Event",
        "start": "2016-01-07",
        "end": "2016-01-10"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-09T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2019-07-17T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2019-07-17T12:00:00",
        "end": "2019-07-17T14:00:00"
      }
    ];
  }

  initializeOptions() {
    return {
      // plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      height: window.innerHeight * 0.95,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      hiddenDays: [0],
      defaultView: 'timeGridWeek',
      allDaySlot: false,
      maxTime: "21:00:00",
      minTime: "09:00:00",
      slotDuration: "00:30:00",
      slotLabelInterval: "00:30:00",
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      selectable: true,
      
    };
  }

  smallCalendarOptions() {
    return {
      defaultDate: new Date(),
      height: window.innerHeight*0.5,
      header: {
        left: 'prev,next',
        center: '',
        right: 'title'
      },
      hiddenDays: [0],
      defaultView: 'dayGridMonth',
      allDaySlot: false,
      aspectRatio: 1.09,
      showNonCurrentDates: false,
      fixedWeekCount: false,
      selectable: true,

    };
  }

  slotForm() {
    return this.fb.group({
      slotDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    })
  }
}
