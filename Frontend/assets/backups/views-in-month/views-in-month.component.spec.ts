import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsInMonthComponent } from './views-in-month.component';

describe('ViewsInMonthComponent', () => {
  let component: ViewsInMonthComponent;
  let fixture: ComponentFixture<ViewsInMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsInMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsInMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
