import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsFeaturesComponent } from './event-details-features.component';

describe('EventDetailsFeaturesComponent', () => {
  let component: EventDetailsFeaturesComponent;
  let fixture: ComponentFixture<EventDetailsFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
