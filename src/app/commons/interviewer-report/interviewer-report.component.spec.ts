import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerReportComponent } from './interviewer-report.component';

describe('InterviewerReportComponent', () => {
  let component: InterviewerReportComponent;
  let fixture: ComponentFixture<InterviewerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
