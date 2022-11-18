import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverVerificationComponent } from './receiver-verification.component';

describe('ReceiverVerificationComponent', () => {
  let component: ReceiverVerificationComponent;
  let fixture: ComponentFixture<ReceiverVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
