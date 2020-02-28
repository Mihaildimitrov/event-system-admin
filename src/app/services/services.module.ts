import { DataService } from './data/data.service';
import { FirebaseService } from './firebase/firebase.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsService } from './translations/translations.service';
import { AuthService } from './authentication/auth.service';
import { AuthGuardService } from './authentication/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FirebaseService,
    DataService,
    TranslationsService,
    AuthService,
    AuthGuardService
  ]
})
export class ServicesModule { }
