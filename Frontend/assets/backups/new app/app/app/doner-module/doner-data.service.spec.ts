import { TestBed } from '@angular/core/testing';

import { DonerDataService } from './doner-data.service';

describe('DonerDataService', () => {
  let service: DonerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
