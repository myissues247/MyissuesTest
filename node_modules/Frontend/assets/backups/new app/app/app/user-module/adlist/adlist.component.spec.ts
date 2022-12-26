import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdlistComponent } from './adlist.component';

describe('AdlistComponent', () => {
  let component: AdlistComponent;
  let fixture: ComponentFixture<AdlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
