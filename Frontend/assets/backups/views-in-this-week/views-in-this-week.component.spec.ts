import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsInThisWeekComponent } from './views-in-this-week.component';

describe('ViewsInThisWeekComponent', () => {
  let component: ViewsInThisWeekComponent;
  let fixture: ComponentFixture<ViewsInThisWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsInThisWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsInThisWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
