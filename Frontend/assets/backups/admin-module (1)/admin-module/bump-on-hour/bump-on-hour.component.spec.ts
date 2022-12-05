import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BumpOnHourComponent } from './bump-on-hour.component';

describe('BumpOnHourComponent', () => {
  let component: BumpOnHourComponent;
  let fixture: ComponentFixture<BumpOnHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BumpOnHourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BumpOnHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
