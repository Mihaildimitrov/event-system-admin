import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsUsersComponent } from './event-details-users.component';

describe('EventDetailsUsersComponent', () => {
  let component: EventDetailsUsersComponent;
  let fixture: ComponentFixture<EventDetailsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
