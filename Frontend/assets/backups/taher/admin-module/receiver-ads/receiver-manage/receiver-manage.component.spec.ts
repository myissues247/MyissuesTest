import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverManageComponent } from './receiver-manage.component';

describe('ReceiverManageComponent', () => {
  let component: ReceiverManageComponent;
  let fixture: ComponentFixture<ReceiverManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
