import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsExternallinksComponent } from './event-details-externallinks.component';

describe('EventDetailsExternallinksComponent', () => {
  let component: EventDetailsExternallinksComponent;
  let fixture: ComponentFixture<EventDetailsExternallinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsExternallinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsExternallinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
