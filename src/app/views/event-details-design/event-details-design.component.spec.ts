import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsDesignComponent } from './event-details-design.component';

describe('EventDetailsDesignComponent', () => {
  let component: EventDetailsDesignComponent;
  let fixture: ComponentFixture<EventDetailsDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
