import { Injectable, ɵConsole } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  eventTranslations_default: Object = [
    {
      'key': 'mobile_yes',
      'value': 'Yes',
      'default_tra': 'Yes'
    },
    {
      'key': 'mobile_no',
      'value': 'No',
      'default_tra': 'No'
    },
    {
      'key': 'mobile_event_code',
      'value': 'Event Code',
      'default_tra': 'Event Code'
    },
    {
      'key': 'mobile_submit_event_code',
      'value': 'Enter Event Code',
      'default_tra': 'Enter Event Code'
    },
    {
      'key': 'mobile_wrong_event_code',
      'value': 'Wrong Event Code!',
      'default_tra': 'Wrong Event Code!'
    }
  ];

  eventTranslations_english: Object = [
    {
      'key': 'mobile_yes',
      'value': 'Yes',
      'default_tra': 'Yes'
    },
    {
      'key': 'mobile_no',
      'value': 'No',
      'default_tra': 'No'
    },
    {
      'key': 'mobile_event_code',
      'value': 'Event Code',
      'default_tra': 'Event Code'
    },
    {
      'key': 'mobile_submit_event_code',
      'value': 'Enter Event Code',
      'default_tra': 'Enter Event Code'
    },
    {
      'key': 'mobile_wrong_event_code',
      'value': 'Wrong Event Code!',
      'default_tra': 'Wrong Event Code!'
    }
  ];

  constructor() { }


  getSystemTranslationsInSpecificLanguage(lang) {

    if(typeof this['eventTranslations_' + lang.toLowerCase()] !== 'undefined') {
      return this['eventTranslations_' + lang.toLowerCase()];
    } else {
      return JSON.parse(JSON.stringify(this.eventTranslations_default))
    }
  }

  mergeTranslations(a, b, changedItems, currentValues) {

    var reduced = a.filter(function(aitem){
        return ! b.find(function(bitem){
          
          if(aitem['key'] === bitem['key']) {
            for (const key in changedItems) {

              if (changedItems.hasOwnProperty(key)) {
                const isTranslationChanged = changedItems[key];

                if(isTranslationChanged) {

                  if(key === bitem['key']) {
                    for (let i = 0; i < currentValues.length; i++) {
                      const traObject = currentValues[i];
  
                      if(traObject.key === key) {
                        bitem['value'] = traObject.value;
                        break;
                      }
                    }
                    break;
                  }
                }
              }
            }
            return true;
          }
          return false;
        });
    });
    return reduced.concat(b);
  }

}
