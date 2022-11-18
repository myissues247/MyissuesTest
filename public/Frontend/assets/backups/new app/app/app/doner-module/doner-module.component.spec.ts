import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerModuleComponent } from './doner-module.component';

describe('DonerModuleComponent', () => {
  let component: DonerModuleComponent;
  let fixture: ComponentFixture<DonerModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonerModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
