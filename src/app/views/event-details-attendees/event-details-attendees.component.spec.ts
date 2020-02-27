import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsAttendeesComponent } from './event-details-attendees.component';

describe('EventDetailsAttendeesComponent', () => {
  let component: EventDetailsAttendeesComponent;
  let fixture: ComponentFixture<EventDetailsAttendeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsAttendeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
