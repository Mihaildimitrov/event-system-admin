import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsListItemComponent } from './events/events-list-item/events-list-item.component';
import { EventsListNavigationComponent } from './events/events-list-navigation/events-list-navigation.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersListItemComponent } from './users/users-list-item/users-list-item.component';
import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { TranslationsListItemComponent } from './translations/translations-list-item/translations-list-item.component';
import { CreateUserModalComponent } from './users/create-user-modal/create-user-modal.component';


@NgModule({
  declarations: [
    EventsListComponent,
    EventsListItemComponent,
    EventsListNavigationComponent,
    UsersListComponent,
    UsersListItemComponent,
    UsersListComponent,
    UsersListItemComponent,
    TranslationsListComponent,
    TranslationsListItemComponent,
    CreateUserModalComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    EventsListComponent,
    EventsListItemComponent,
    EventsListNavigationComponent,
    UsersListComponent,
    UsersListItemComponent,
    CreateUserModalComponent,
    TranslationsListComponent,
    TranslationsListItemComponent
  ]
})
export class FeaturesModule { }
