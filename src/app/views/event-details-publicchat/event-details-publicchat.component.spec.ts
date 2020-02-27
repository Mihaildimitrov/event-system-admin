import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsPublicchatComponent } from './event-details-publicchat.component';

describe('EventDetailsPublicchatComponent', () => {
  let component: EventDetailsPublicchatComponent;
  let fixture: ComponentFixture<EventDetailsPublicchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsPublicchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsPublicchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
