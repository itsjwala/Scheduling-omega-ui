import { Injectable } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import Data from './available-data';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  data = new Data();
  constructor(private fb: FormBuilder) { }


  getAvailbleSlots() {
    return [
      {
        slotId: 1,
        slot: {
          from: '2019-07-23T05:00:00',
          to: '2019-07-23T08:00:00'
        },
        interviewerId: 1,
        interviewerName: 'jigar wala',
        levels: [
          {
            id: 1,
            level: 'R1'
          }
        ],
        technologies: [
          {
            id: 1,
            technology: 'Angular'
          },
          {
            id: 2,
            technology: 'Java'
          }
        ],
        scheduled: false
      }];
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
      height: window.innerHeight * 0.5,
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

  scheduleForm() {
    return this.fb.group({
      candidateName: ['', Validators.required],
      candidatePh: ['', Validators.required],
      candidateCV: ['', Validators.required],
      interviewDescr: [''],
      round: ['', Validators.required],
      technology: ['', Validators.required]
    })
  }
}
