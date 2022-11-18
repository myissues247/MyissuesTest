import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveservicesComponent } from './liveservices.component';

describe('LiveservicesComponent', () => {
  let component: LiveservicesComponent;
  let fixture: ComponentFixture<LiveservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
