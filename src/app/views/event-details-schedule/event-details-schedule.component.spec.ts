import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsScheduleComponent } from './event-details-schedule.component';

describe('EventDetailsScheduleComponent', () => {
  let component: EventDetailsScheduleComponent;
  let fixture: ComponentFixture<EventDetailsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
