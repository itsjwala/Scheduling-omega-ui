import { TestBed } from '@angular/core/testing';

import { InterviewerService } from './interviewer.service';

describe('InterviewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewerService = TestBed.get(InterviewerService);
    expect(service).toBeTruthy();
  });
});
