import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorFullInfoComponent } from './donor-full-info.component';

describe('DonorFullInfoComponent', () => {
  let component: DonorFullInfoComponent;
  let fixture: ComponentFixture<DonorFullInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorFullInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
