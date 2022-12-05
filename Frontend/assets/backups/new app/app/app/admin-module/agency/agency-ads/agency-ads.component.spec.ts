import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdsComponent } from './agency-ads.component';

describe('AgencyAdsComponent', () => {
  let component: AgencyAdsComponent;
  let fixture: ComponentFixture<AgencyAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
