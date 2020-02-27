import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsPrivatechatComponent } from './event-details-privatechat.component';

describe('EventDetailsPrivatechatComponent', () => {
  let component: EventDetailsPrivatechatComponent;
  let fixture: ComponentFixture<EventDetailsPrivatechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsPrivatechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsPrivatechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
