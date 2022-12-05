import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BumpsComponent } from './bumps.component';

describe('BumpsComponent', () => {
  let component: BumpsComponent;
  let fixture: ComponentFixture<BumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BumpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
