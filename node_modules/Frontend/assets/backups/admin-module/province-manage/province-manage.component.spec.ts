import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceManageComponent } from './province-manage.component';

describe('ProvinceManageComponent', () => {
  let component: ProvinceManageComponent;
  let fixture: ComponentFixture<ProvinceManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
