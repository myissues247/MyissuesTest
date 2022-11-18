import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateHousingComponent } from './donate-housing.component';

describe('DonateHousingComponent', () => {
  let component: DonateHousingComponent;
  let fixture: ComponentFixture<DonateHousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateHousingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
