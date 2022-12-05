import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDonationsComponent } from './your-donations.component';

describe('YourDonationsComponent', () => {
  let component: YourDonationsComponent;
  let fixture: ComponentFixture<YourDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourDonationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
