import { TestBed } from '@angular/core/testing';

import { RestrictionGuard } from './restriction.guard';

describe('RestrictionGuard', () => {
  let guard: RestrictionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestrictionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
