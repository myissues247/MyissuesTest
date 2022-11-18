import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerManageComponent } from './donner-manage.component';

describe('DonnerManageComponent', () => {
  let component: DonnerManageComponent;
  let fixture: ComponentFixture<DonnerManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonnerManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
