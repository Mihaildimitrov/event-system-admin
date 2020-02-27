import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsExhibitorsComponent } from './event-details-exhibitors.component';

describe('EventDetailsExhibitorsComponent', () => {
  let component: EventDetailsExhibitorsComponent;
  let fixture: ComponentFixture<EventDetailsExhibitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsExhibitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsExhibitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
