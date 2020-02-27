import { DataService } from './data/data.service';
import { FirebaseService } from './firebase/firebase.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService } from './translations/translations.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseService,
    DataService,
    TranslationsService
  ],
  providers: [
    FirebaseService,
    DataService,
    TranslationsService
  ]
})
export class ServicesModule { }
