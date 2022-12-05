import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSponsorsComponent } from './site-sponsors.component';

describe('SiteSponsorsComponent', () => {
  let component: SiteSponsorsComponent;
  let fixture: ComponentFixture<SiteSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
