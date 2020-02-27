import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsContentComponent } from './event-details-content.component';

describe('EventDetailsContentComponent', () => {
  let component: EventDetailsContentComponent;
  let fixture: ComponentFixture<EventDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
