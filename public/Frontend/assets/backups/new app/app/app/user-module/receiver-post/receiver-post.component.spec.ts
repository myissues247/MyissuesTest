import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverPostComponent } from './receiver-post.component';

describe('ReceiverPostComponent', () => {
  let component: ReceiverPostComponent;
  let fixture: ComponentFixture<ReceiverPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
