import { ListPage } from './../../../../../eventApp/src/app/list/list.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { TranslationsService } from 'src/app/services/translations/translations.service';

@Component({
  selector: 'app-event-details-translations',
  templateUrl: './event-details-translations.component.html',
  styleUrls: ['./event-details-translations.component.scss']
})
export class EventDetailsTranslationsComponent implements OnInit {


  stillLoadingContent: Boolean = true;
  stillLoadingTranslationsList: Boolean = false;
  eventSettings: any;
  eventTranslations: any = {};
  private selectedLanguageTabIndex = 0;
  inputsStatus: any = {};
  unsavedTranslationsShowWarningMsg: any = {};
  isSavingEventTranslations: Boolean = false;
  saveTranslationsShowSuccessMsg: Boolean = false;
  searchWord = '';

  private currentEventCode: string;
  private sortTranslationsByKey(a, b) {
    let charA = a.key.toLowerCase();
    let charB = b.key.toLowerCase();
    return charA.localeCompare(charB);
  }
  private getEventTranslationInSpecificLanguage(lang, componentInit = false) {

    if(!this.eventTranslations[lang].length) {
      this.dataService.getEventTranslations(this.currentEventCode, lang).then((translations: any) => {

        if (translations.length) {
          this.eventTranslations[lang] = translations.sort(this.sortTranslationsByKey);
        } else {
          this.eventTranslations[lang] = this.translationsService.getSystemTranslationsInSpecificLanguage(lang).sort(this.sortTranslationsByKey);
        }
  
        if (componentInit) {
          this.stillLoadingContent = false;
        }
        this.stillLoadingTranslationsList = false;
      }, (error: any) => {
        console.log(error);
      });
    } else {
      if (componentInit) {
        this.stillLoadingContent = false;
      }
      this.stillLoadingTranslationsList = false;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private translationsService: TranslationsService
  ) {
    this.currentEventCode = this.route.snapshot.parent.params['id'];
  }

  ngOnInit() {

    this.dataService.getEventData(this.currentEventCode).then((settings: any) => {
      this.eventSettings = settings;

      for (let i = 0; i < settings.event_languages.length; i++) {
        this.eventTranslations[settings.event_languages[i]] = [];
        this.inputsStatus[settings.event_languages[i]] = {};
        this.unsavedTranslationsShowWarningMsg[settings.event_languages[i]] = false;
      }
      this.getEventTranslationInSpecificLanguage(this.eventSettings.event_languages[0], true);
    }, (error: any) => {
      console.log(error);
    });
  }

  translationDetectChange(key, newValue) {
    let hasDirtyFields = false;
    let currentLang = this.eventSettings.event_languages[this.selectedLanguageTabIndex];
    this.inputsStatus[currentLang][key] = true;

    for (var prop in this.inputsStatus[currentLang]) {

      if (this.inputsStatus[currentLang].hasOwnProperty(prop)) {
        hasDirtyFields = true;
      }
    }

    if (hasDirtyFields) {
      this.unsavedTranslationsShowWarningMsg[currentLang] = true;
    }
  }

  languageTabChanged(event) {
    this.stillLoadingTranslationsList = true;
    this.selectedLanguageTabIndex = event.index;
    this.getEventTranslationInSpecificLanguage(this.eventSettings.event_languages[event.index]);
  }

  saveEventTranslations() {
    this.isSavingEventTranslations = true;   
    this.dataService.saveEventTranslations(this.currentEventCode, this.eventTranslations, this.eventSettings.event_languages.length).then((result: any) => {
      this.isSavingEventTranslations = false;
      this.saveTranslationsShowSuccessMsg = true;
      for (let i = 0; i < this.eventSettings.event_languages.length; i++) {
        this.inputsStatus[this.eventSettings.event_languages[i]] = {};
        this.unsavedTranslationsShowWarningMsg[this.eventSettings.event_languages[i]] = false;
      }

      setTimeout(() => {
        this.saveTranslationsShowSuccessMsg = false;
      }, 3000);
    }, (error: any) => {
      console.log(error);
    });
  }

  searchTranslations(word) {
    console.log('Search for => ', word);

    for (const currentLanguage in this.eventTranslations) {
      if (this.eventTranslations.hasOwnProperty(currentLanguage)) {
        const currentTranslations = this.eventTranslations[currentLanguage];
        
      }
    }
  } 

}


