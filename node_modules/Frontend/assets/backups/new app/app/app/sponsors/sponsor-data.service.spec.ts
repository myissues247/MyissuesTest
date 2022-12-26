import { TestBed } from '@angular/core/testing';

import { SponsorDataService } from './sponsor-data.service';

describe('SponsorDataService', () => {
  let service: SponsorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
