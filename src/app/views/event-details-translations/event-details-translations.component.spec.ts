import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsTranslationsComponent } from './event-details-translations.component';

describe('EventDetailsTranslationsComponent', () => {
  let component: EventDetailsTranslationsComponent;
  let fixture: ComponentFixture<EventDetailsTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
