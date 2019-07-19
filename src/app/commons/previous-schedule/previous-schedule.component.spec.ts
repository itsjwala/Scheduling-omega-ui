import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousScheduleComponent } from './previous-schedule.component';

describe('PreviousScheduleComponent', () => {
  let component: PreviousScheduleComponent;
  let fixture: ComponentFixture<PreviousScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
