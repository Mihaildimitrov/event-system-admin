import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsAttachedAppsComponent } from './event-details-attached-apps.component';

describe('EventDetailsAttachedAppsComponent', () => {
  let component: EventDetailsAttachedAppsComponent;
  let fixture: ComponentFixture<EventDetailsAttachedAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsAttachedAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsAttachedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
