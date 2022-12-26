import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBumpsComponent } from './purchase-bumps.component';

describe('PurchaseBumpsComponent', () => {
  let component: PurchaseBumpsComponent;
  let fixture: ComponentFixture<PurchaseBumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBumpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
