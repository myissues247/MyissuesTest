import { TestBed } from '@angular/core/testing';

import { AgencyDataService } from './agency-data.service';

describe('AgencyDataService', () => {
  let service: AgencyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
