import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighbourinfoComponent } from './neighbourinfo.component';

describe('NeighbourinfoComponent', () => {
  let component: NeighbourinfoComponent;
  let fixture: ComponentFixture<NeighbourinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighbourinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighbourinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
