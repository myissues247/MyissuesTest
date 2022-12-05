import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorManageComponent } from './sponsor-manage.component';

describe('SponsorManageComponent', () => {
  let component: SponsorManageComponent;
  let fixture: ComponentFixture<SponsorManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
