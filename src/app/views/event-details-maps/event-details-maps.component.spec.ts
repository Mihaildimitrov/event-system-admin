import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsMapsComponent } from './event-details-maps.component';

describe('EventDetailsMapsComponent', () => {
  let component: EventDetailsMapsComponent;
  let fixture: ComponentFixture<EventDetailsMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
