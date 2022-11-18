import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedyadsComponent } from './needyads.component';

describe('NeedyadsComponent', () => {
  let component: NeedyadsComponent;
  let fixture: ComponentFixture<NeedyadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedyadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedyadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
