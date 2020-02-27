import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsBlogsComponent } from './event-details-blogs.component';

describe('EventDetailsBlogsComponent', () => {
  let component: EventDetailsBlogsComponent;
  let fixture: ComponentFixture<EventDetailsBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
