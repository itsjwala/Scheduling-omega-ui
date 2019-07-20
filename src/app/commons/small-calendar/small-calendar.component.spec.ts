import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCalendarComponent } from './small-calendar.component';

describe('SmallCalendarComponent', () => {
  let component: SmallCalendarComponent;
  let fixture: ComponentFixture<SmallCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
