import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsNotificationsComponent } from './event-details-notifications.component';

describe('EventDetailsNotificationsComponent', () => {
  let component: EventDetailsNotificationsComponent;
  let fixture: ComponentFixture<EventDetailsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
