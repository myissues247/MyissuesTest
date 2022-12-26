import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsInLastWeekComponent } from './views-in-last-week.component';

describe('ViewsInLastWeekComponent', () => {
  let component: ViewsInLastWeekComponent;
  let fixture: ComponentFixture<ViewsInLastWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsInLastWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsInLastWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
