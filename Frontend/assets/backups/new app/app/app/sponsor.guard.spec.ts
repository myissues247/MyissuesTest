import { TestBed } from '@angular/core/testing';

import { SponsorGuard } from './sponsor.guard';

describe('SponsorGuard', () => {
  let guard: SponsorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SponsorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
