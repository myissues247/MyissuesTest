import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsManageComponent } from './comments-manage.component';

describe('CommentsManageComponent', () => {
  let component: CommentsManageComponent;
  let fixture: ComponentFixture<CommentsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
