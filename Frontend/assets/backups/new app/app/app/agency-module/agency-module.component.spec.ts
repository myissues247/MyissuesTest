import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyModuleComponent } from './agency-module.component';

describe('AgencyModuleComponent', () => {
  let component: AgencyModuleComponent;
  let fixture: ComponentFixture<AgencyModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
