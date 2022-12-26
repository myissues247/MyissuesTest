import { TestBed } from '@angular/core/testing';

import { AdPostService } from './ad-post.service';

describe('AdPostService', () => {
  let service: AdPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
