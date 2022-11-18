import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionManageComponent } from './discussion-manage.component';

describe('DiscussionManageComponent', () => {
  let component: DiscussionManageComponent;
  let fixture: ComponentFixture<DiscussionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
