import { TestBed } from '@angular/core/testing';

import { CalendarInteractionService } from './calendar-interaction.service';

describe('CalendarInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarInteractionService = TestBed.get(CalendarInteractionService);
    expect(service).toBeTruthy();
  });
});
