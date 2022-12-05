import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyManageComponent } from './agency-manage.component';

describe('AgencyManageComponent', () => {
  let component: AgencyManageComponent;
  let fixture: ComponentFixture<AgencyManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
