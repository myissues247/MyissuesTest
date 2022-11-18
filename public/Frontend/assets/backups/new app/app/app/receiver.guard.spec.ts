import { TestBed } from '@angular/core/testing';

import { ReceiverGuard } from './receiver.guard';

describe('ReceiverGuard', () => {
  let guard: ReceiverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReceiverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
