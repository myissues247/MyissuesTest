import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerManageComponent } from './volunteer-manage.component';

describe('VolunteerManageComponent', () => {
  let component: VolunteerManageComponent;
  let fixture: ComponentFixture<VolunteerManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
