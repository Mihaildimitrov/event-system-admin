import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsListItemComponent } from './translations-list-item.component';

describe('TranslationsListItemComponent', () => {
  let component: TranslationsListItemComponent;
  let fixture: ComponentFixture<TranslationsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
