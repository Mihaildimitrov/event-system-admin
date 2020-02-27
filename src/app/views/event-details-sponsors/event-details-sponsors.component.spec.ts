import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsSponsorsComponent } from './event-details-sponsors.component';

describe('EventDetailsSponsorsComponent', () => {
  let component: EventDetailsSponsorsComponent;
  let fixture: ComponentFixture<EventDetailsSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
