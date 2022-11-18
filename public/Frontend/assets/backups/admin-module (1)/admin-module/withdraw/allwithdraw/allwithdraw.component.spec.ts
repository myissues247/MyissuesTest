import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllwithdrawComponent } from './allwithdraw.component';

describe('AllwithdrawComponent', () => {
  let component: AllwithdrawComponent;
  let fixture: ComponentFixture<AllwithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllwithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
