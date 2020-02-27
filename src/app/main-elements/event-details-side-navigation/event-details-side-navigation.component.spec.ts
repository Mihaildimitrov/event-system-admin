import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsSideNavigationComponent } from './event-details-side-navigation.component';

describe('EventDetailsSideNavigationComponent', () => {
  let component: EventDetailsSideNavigationComponent;
  let fixture: ComponentFixture<EventDetailsSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
