import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsFormsComponent } from './event-details-forms.component';

describe('EventDetailsFormsComponent', () => {
  let component: EventDetailsFormsComponent;
  let fixture: ComponentFixture<EventDetailsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
