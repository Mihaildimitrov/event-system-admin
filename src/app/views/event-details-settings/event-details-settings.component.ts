import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-event-details-settings',
  templateUrl: './event-details-settings.component.html',
  styleUrls: ['./event-details-settings.component.scss']
})
export class EventDetailsSettingsComponent implements OnInit {

  eventSettings = {
    custom_css: '',
    custom_js: '',
    description: '',
    end_date: '',
    event_code: '',
    event_default_lang: '',
    event_lang: '',
    event_languages: [],
    event_type: '',
    is_published: false,
    signIn: false,
    signUp: false,
    start_date: '',
    title: '' 
  };
  eventSettingsFieldsStatus = {
    is_valid_custom_css: true,
    is_valid_custom_js: true,
    is_valid_description: true,
    is_valid_end_date: true,
    is_valid_event_code: true,
    is_valid_event_default_lang: true,
    is_valid_event_lang: true,
    is_valid_event_languages: true,
    is_valid_event_type: true,
    is_valid_is_published: true,
    is_valid_signIn: true,
    is_valid_signUp: true,
    is_valid_start_date: true,
    is_valid_title: true
  };
  eventValidLanguages: Array<String> = [
    'ENGLISH',
    'GERMAN',
    'SPANISH',
    'GREEK',
    'BULGARIAN',
    'ITALIAN'
  ];
  private resetEventFormFieldsStatus() {
    this.eventSettingsFieldsStatus = {
      is_valid_custom_css: true,
      is_valid_custom_js: true,
      is_valid_description: true,
      is_valid_end_date: true,
      is_valid_event_code: true,
      is_valid_event_default_lang: true,
      is_valid_event_lang: true,
      is_valid_event_languages: true,
      is_valid_event_type: true,
      is_valid_is_published: true,
      is_valid_signIn: true,
      is_valid_signUp: true,
      is_valid_start_date: true,
      is_valid_title: true
    };
  }
  stillLoadingContent: Boolean = true;
  isSavingEventSettingsData: Boolean = false;
  saveSettingsShowSuccessMsg: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {

    const currentEventCode: any = this.route.snapshot.parent.params['id'];
    this.dataService.getEventData(currentEventCode).then((result: any) => {
      console.log(result);
      this.eventSettings = result;
      this.stillLoadingContent = false;
    }, (error: any) => {
      console.log(error);
    });
  }

  chnageEventlanguagesValue(event) {

    if(event.target.checked) {
      this.eventSettings.event_languages.push(event.target.value);

      if(this.eventSettings.event_languages.length && this.eventSettings.event_default_lang === '') {
        this.eventSettings.event_default_lang = this.eventSettings.event_languages[0];
      }
    } else {
      var index = this.eventSettings.event_languages.indexOf(event.target.value);
      
      if (index > -1) {
        this.eventSettings.event_languages.splice(index, 1);
      }

      if(!this.eventSettings.event_languages.length) {
        this.eventSettings.event_default_lang = '';
      }
    }
  }

  saveEventSettings() {
    this.isSavingEventSettingsData = true;
    this.resetEventFormFieldsStatus();
    console.log(this.eventSettings);
    let settings = this.eventSettings;
    let isSettingsValid = true;

    if(settings.title === '') {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_title = false;
    }
    
    if(settings.description === '') {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_description = false;
    } 
  
    if(settings.event_code === '' || settings.event_code.length !== 6) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_event_code = false;
    } 
    
    if(settings.start_date === '' || new Date(settings.start_date).getTime() > new Date(settings.end_date).getTime()) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_start_date = false;
    } 
    
    if(settings.end_date === '' || new Date(settings.end_date).getTime() < new Date(settings.start_date).getTime()) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_end_date = false;
    } 
    
    if(settings.event_type === '' || (settings.event_type !== 'Single' && settings.event_type !== 'Multi')) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_event_type = false;
    } 
    
    if(settings.is_published !== false && settings.is_published !== true) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_is_published = false;
    } 
    
    if(settings.event_default_lang === '') {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_event_default_lang = false;
    } 
    
    if(!settings.event_languages.length) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_event_languages = false;
    }

     if(settings.signIn !== false && settings.signIn !== true) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_signIn = false;
    } 
    
    if(settings.signUp !== false && settings.signUp !== true) {
      isSettingsValid = false;
      this.eventSettingsFieldsStatus.is_valid_signUp = false;
    } 
    
    
    if(isSettingsValid) {
      // Submit event settings
      console.log('Settings are valid!');

      this.dataService.saveEventData(settings).then((result: any) => {
        console.log(result);
        this.isSavingEventSettingsData = false;
        this.saveSettingsShowSuccessMsg = true;
        setTimeout(() => {
          this.saveSettingsShowSuccessMsg = false;
        }, 3000);
      }, (error: any) => {
        console.log(error);
      });

    } else {
      console.log('Show error messages!');
      console.log(this.eventSettingsFieldsStatus);
      this.isSavingEventSettingsData = false;
    }
  }

  checkIfLanguageIsSelectedForEvent(lang) {
    return this.eventSettings.event_languages.indexOf(lang) > -1;
  }

  checkForDefaultEventLang(lang) {
    return this.eventSettings.event_default_lang === lang ? true : null;
  }

  getEventTitleForCurrentLang(lang) {

    if(typeof this.eventSettings['title_tra'] === 'undefined' || typeof this.eventSettings['title_tra'][lang] === 'undefined') {

      if(typeof this.eventSettings['title_tra'] === 'undefined') {
        this.eventSettings['title_tra'] = {};
      }
      this.eventSettings['title_tra'][lang] = this.eventSettings.title;
    }
    return this.eventSettings['title_tra'][lang];
  }

  setEventTitleForCurrentLang(lang, value) {

    if(typeof this.eventSettings['title_tra'] === 'undefined') {
      this.eventSettings['title_tra'] = {};
    }
    this.eventSettings['title_tra'][lang] = value;
  }

  getEventDescriptionForCurrentLang(lang) {

    if(typeof this.eventSettings['description_tra'] === 'undefined' || typeof this.eventSettings['description_tra'][lang] === 'undefined') {

      if(typeof this.eventSettings['description_tra'] === 'undefined') {
        this.eventSettings['description_tra'] = {};
      }
      this.eventSettings['description_tra'][lang] = this.eventSettings.description;
    }
    return this.eventSettings['description_tra'][lang];
  }

  setEventDescriptionForCurrentLang(lang, value) {
    
    if(typeof this.eventSettings['description_tra'] === 'undefined') {
      this.eventSettings['description_tra'] = {};
    }
    this.eventSettings['description_tra'][lang] = value;
  }
}
