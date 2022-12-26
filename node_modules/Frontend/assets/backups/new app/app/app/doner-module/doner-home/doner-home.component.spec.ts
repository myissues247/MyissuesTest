import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerHomeComponent } from './doner-home.component';

describe('DonerHomeComponent', () => {
  let component: DonerHomeComponent;
  let fixture: ComponentFixture<DonerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
