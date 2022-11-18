import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedyadsfullComponent } from './needyadsfull.component';

describe('NeedyadsfullComponent', () => {
  let component: NeedyadsfullComponent;
  let fixture: ComponentFixture<NeedyadsfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedyadsfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedyadsfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
