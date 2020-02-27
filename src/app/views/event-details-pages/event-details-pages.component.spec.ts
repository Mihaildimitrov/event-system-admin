import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsPagesComponent } from './event-details-pages.component';

describe('EventDetailsPagesComponent', () => {
  let component: EventDetailsPagesComponent;
  let fixture: ComponentFixture<EventDetailsPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
