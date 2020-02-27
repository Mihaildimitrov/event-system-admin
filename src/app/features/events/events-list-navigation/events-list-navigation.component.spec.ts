import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListNavigationComponent } from './events-list-navigation.component';

describe('EventsListNavigationComponent', () => {
  let component: EventsListNavigationComponent;
  let fixture: ComponentFixture<EventsListNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsListNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
