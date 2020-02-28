import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-events-list-navigation',
  templateUrl: './events-list-navigation.component.html',
  styleUrls: ['./events-list-navigation.component.scss']
})
export class EventsListNavigationComponent implements OnInit {

  showCreateEventModal: Boolean = false;
  @Output() newEventAdded = new EventEmitter<boolean>();

  newEventForm = new FormGroup({
    eventTitle: new FormControl(''),
    eventDescription: new FormControl(''),
    eventCode: new FormControl(''),
    eventStartDate: new FormControl(''),
    eventEndDate: new FormControl(''),
    eventType: new FormControl('Single'),
  });
  formIsDirty = false;
  eventCodeAlreadyExist = false;
  eventCreatedSuccessfullyAlertVisibility = false;

  constructor(private dataService: DataService) { }

  toggleModal () {

    if(this.showCreateEventModal) {
      this.newEventForm.reset();
      this.formIsDirty = false;
    }
    this.showCreateEventModal = !this.showCreateEventModal;
  }

  onCreateEvent() {
    this.formIsDirty = true;

    if (this.newEventForm.invalid) {

    } else if (this.newEventForm.valid) {
      const eventObj = {
        event_code: this.newEventForm.value.eventCode,
        event_type: this.newEventForm.value.eventType,
        is_published: false,
        title: this.newEventForm.value.eventTitle,
        description: this.newEventForm.value.eventDescription,
        start_date: this.newEventForm.value.eventStartDate,
        end_date: this.newEventForm.value.eventEndDate,
        signIn: false,
        signUp: false,
        event_languages: ['ENGLISH', 'GERMAN'],
        event_default_lang: 'ENGLISH',
        event_lang: 'ENGLISH',
        custom_css: '',
        custom_js: '',
      };

      this.dataService.createNewEvent(eventObj).then((result: any) => {

        this.newEventForm.reset();
        this.formIsDirty = false;
        this.eventCodeAlreadyExist = false;
        this.showCreateEventModal = !this.showCreateEventModal;
        this.showCreateSuccessfullyMessage();
        this.newEventAdded.emit(true);
      }, (error: any) => {
        console.log('error', error);
        this.eventCodeAlreadyExist = true;
      });
    } else {
      
    }
  }

  showCreateSuccessfullyMessage() {
    this.eventCreatedSuccessfullyAlertVisibility = true;
    setTimeout(() => {
      this.eventCreatedSuccessfullyAlertVisibility = false;
    }, 5000);
  }

  // convenience getter for easy access to form fields
  get getFormFieldRef() { return this.newEventForm.controls; }

  ngOnInit() {

  }

}
