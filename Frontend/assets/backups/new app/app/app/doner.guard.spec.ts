import { TestBed } from '@angular/core/testing';

import { DonerGuard } from './doner.guard';

describe('DonerGuard', () => {
  let guard: DonerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DonerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
