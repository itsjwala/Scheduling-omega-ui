import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigCalendarComponent } from './big-calendar.component';

describe('BigCalendarComponent', () => {
  let component: BigCalendarComponent;
  let fixture: ComponentFixture<BigCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
