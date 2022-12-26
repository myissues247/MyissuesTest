import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateHouseComponent } from './donate-house.component';

describe('DonateHouseComponent', () => {
  let component: DonateHouseComponent;
  let fixture: ComponentFixture<DonateHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
