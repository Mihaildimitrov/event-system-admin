import { ReactiveFormsModule } from '@angular/forms';
import { MainElementsModule } from './../main-elements/main-elements.module';
import { RouterModule } from '@angular/router';

import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { FeaturesModule } from '../features/features.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventDetailsDashboardComponent } from './event-details-dashboard/event-details-dashboard.component';
import { EventDetailsSettingsComponent } from './event-details-settings/event-details-settings.component';
import { EventDetailsFeaturesComponent } from './event-details-features/event-details-features.component';
import { EventDetailsContentComponent } from './event-details-content/event-details-content.component';
import { EventDetailsScheduleComponent } from './event-details-schedule/event-details-schedule.component';
import { EventDetailsAttendeesComponent } from './event-details-attendees/event-details-attendees.component';
import { EventDetailsUsersComponent } from './event-details-users/event-details-users.component';
import { EventDetailsSpeakersComponent } from './event-details-speakers/event-details-speakers.component';
import { EventDetailsSponsorsComponent } from './event-details-sponsors/event-details-sponsors.component';
import { EventDetailsExhibitorsComponent } from './event-details-exhibitors/event-details-exhibitors.component';
import { EventDetailsMapsComponent } from './event-details-maps/event-details-maps.component';
import { EventDetailsPagesComponent } from './event-details-pages/event-details-pages.component';
import { EventDetailsFormsComponent } from './event-details-forms/event-details-forms.component';
import { EventDetailsLivepollComponent } from './event-details-livepoll/event-details-livepoll.component';
import { EventDetailsFloorplanComponent } from './event-details-floorplan/event-details-floorplan.component';
import { EventDetailsWeatherComponent } from './event-details-weather/event-details-weather.component';
import { EventDetailsExternallinksComponent } from './event-details-externallinks/event-details-externallinks.component';
import { EventDetailsActivityfeedComponent } from './event-details-activityfeed/event-details-activityfeed.component';
import { EventDetailsPublicchatComponent } from './event-details-publicchat/event-details-publicchat.component';
import { EventDetailsTranslationsComponent } from './event-details-translations/event-details-translations.component';
import { EventDetailsDesignComponent } from './event-details-design/event-details-design.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import { EventDetailsAttachedAppsComponent } from './event-details-attached-apps/event-details-attached-apps.component';
import { EventDetailsBlogsComponent } from './event-details-blogs/event-details-blogs.component';
import { EventDetailsNotificationsComponent } from './event-details-notifications/event-details-notifications.component';
import { EventDetailsPrivatechatComponent } from './event-details-privatechat/event-details-privatechat.component';
import { FilterByStringPipe } from './../pipes/filter-by-string.pipe';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EventsComponent,
    EventDetailsComponent,
    EventDetailsDashboardComponent,
    EventDetailsSettingsComponent,
    EventDetailsFeaturesComponent,
    EventDetailsContentComponent,
    EventDetailsScheduleComponent,
    EventDetailsAttendeesComponent,
    EventDetailsUsersComponent,
    EventDetailsSpeakersComponent,
    EventDetailsSponsorsComponent,
    EventDetailsExhibitorsComponent,
    EventDetailsMapsComponent,
    EventDetailsPagesComponent,
    EventDetailsFormsComponent,
    EventDetailsLivepollComponent,
    EventDetailsFloorplanComponent,
    EventDetailsWeatherComponent,
    EventDetailsExternallinksComponent,
    EventDetailsActivityfeedComponent,
    EventDetailsPublicchatComponent,
    EventDetailsTranslationsComponent,
    EventDetailsDesignComponent,
    EventDetailsAttachedAppsComponent,
    EventDetailsBlogsComponent,
    EventDetailsNotificationsComponent,
    EventDetailsPrivatechatComponent,
    FilterByStringPipe,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  exports: [
    DashboardComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    RouterModule,
    MainElementsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ColorPickerModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewsModule { }
