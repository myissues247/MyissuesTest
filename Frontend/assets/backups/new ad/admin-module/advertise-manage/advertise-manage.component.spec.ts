import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseManageComponent } from './advertise-manage.component';

describe('AdvertiseManageComponent', () => {
  let component: AdvertiseManageComponent;
  let fixture: ComponentFixture<AdvertiseManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
