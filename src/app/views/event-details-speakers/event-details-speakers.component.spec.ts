import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsSpeakersComponent } from './event-details-speakers.component';

describe('EventDetailsSpeakersComponent', () => {
  let component: EventDetailsSpeakersComponent;
  let fixture: ComponentFixture<EventDetailsSpeakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsSpeakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
