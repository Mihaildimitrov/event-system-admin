import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsActivityfeedComponent } from './event-details-activityfeed.component';

describe('EventDetailsActivityfeedComponent', () => {
  let component: EventDetailsActivityfeedComponent;
  let fixture: ComponentFixture<EventDetailsActivityfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsActivityfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsActivityfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
