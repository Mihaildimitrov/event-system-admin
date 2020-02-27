import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsFloorplanComponent } from './event-details-floorplan.component';

describe('EventDetailsFloorplanComponent', () => {
  let component: EventDetailsFloorplanComponent;
  let fixture: ComponentFixture<EventDetailsFloorplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsFloorplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsFloorplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
