import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsDashboardComponent } from './event-details-dashboard.component';

describe('EventDetailsDashboardComponent', () => {
  let component: EventDetailsDashboardComponent;
  let fixture: ComponentFixture<EventDetailsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
