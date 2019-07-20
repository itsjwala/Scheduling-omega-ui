import { TestBed } from '@angular/core/testing';

import { ShowSnackBarService } from './show-snack-bar.service';

describe('ShowSnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowSnackBarService = TestBed.get(ShowSnackBarService);
    expect(service).toBeTruthy();
  });
});
