import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsWeatherComponent } from './event-details-weather.component';

describe('EventDetailsWeatherComponent', () => {
  let component: EventDetailsWeatherComponent;
  let fixture: ComponentFixture<EventDetailsWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
