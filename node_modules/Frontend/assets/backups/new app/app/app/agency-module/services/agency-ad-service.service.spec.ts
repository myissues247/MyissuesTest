import { TestBed } from '@angular/core/testing';

import { AgencyAdServiceService } from './agency-ad-service.service';

describe('AgencyAdServiceService', () => {
  let service: AgencyAdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyAdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
