import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverAdsComponent } from './receiver-ads.component';

describe('ReceiverAdsComponent', () => {
  let component: ReceiverAdsComponent;
  let fixture: ComponentFixture<ReceiverAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
