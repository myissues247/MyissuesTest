import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscsComponent } from './miscs.component';

describe('MiscsComponent', () => {
  let component: MiscsComponent;
  let fixture: ComponentFixture<MiscsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
