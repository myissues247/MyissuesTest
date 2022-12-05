import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdContentComponent } from './ad-content.component';

describe('AdContentComponent', () => {
  let component: AdContentComponent;
  let fixture: ComponentFixture<AdContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
