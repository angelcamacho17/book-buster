import { TestBed } from '@angular/core/testing';

import { NotSupportedGuard } from './not-supported.guard';

describe('NotSupportedGuard', () => {
  let guard: NotSupportedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotSupportedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
