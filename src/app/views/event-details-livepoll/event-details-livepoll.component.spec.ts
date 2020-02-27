import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsLivepollComponent } from './event-details-livepoll.component';

describe('EventDetailsLivepollComponent', () => {
  let component: EventDetailsLivepollComponent;
  let fixture: ComponentFixture<EventDetailsLivepollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsLivepollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsLivepollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
