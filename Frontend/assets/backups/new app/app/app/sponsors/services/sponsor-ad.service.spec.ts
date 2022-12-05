import { TestBed } from '@angular/core/testing';

import { SponsorAdService } from './sponsor-ad.service';

describe('SponsorAdService', () => {
  let service: SponsorAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
