import { UserDetailsComponent } from './views/user-details/user-details.component';
import { UsersComponent } from './views/users/users.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { EventDetailsAttachedAppsComponent } from './views/event-details-attached-apps/event-details-attached-apps.component';
import { EventDetailsDesignComponent } from './views/event-details-design/event-details-design.component';
import { EventDetailsTranslationsComponent } from './views/event-details-translations/event-details-translations.component';
import { EventDetailsPublicchatComponent } from './views/event-details-publicchat/event-details-publicchat.component';
import { EventDetailsActivityfeedComponent } from './views/event-details-activityfeed/event-details-activityfeed.component';
import { EventDetailsExternallinksComponent } from './views/event-details-externallinks/event-details-externallinks.component';
import { EventDetailsWeatherComponent } from './views/event-details-weather/event-details-weather.component';
import { EventDetailsFloorplanComponent } from './views/event-details-floorplan/event-details-floorplan.component';
import { EventDetailsLivepollComponent } from './views/event-details-livepoll/event-details-livepoll.component';
import { EventDetailsFormsComponent } from './views/event-details-forms/event-details-forms.component';
import { EventDetailsPagesComponent } from './views/event-details-pages/event-details-pages.component';
import { EventDetailsMapsComponent } from './views/event-details-maps/event-details-maps.component';
import { EventDetailsExhibitorsComponent } from './views/event-details-exhibitors/event-details-exhibitors.component';
import { EventDetailsSponsorsComponent } from './views/event-details-sponsors/event-details-sponsors.component';
import { EventDetailsSpeakersComponent } from './views/event-details-speakers/event-details-speakers.component';
import { EventDetailsUsersComponent } from './views/event-details-users/event-details-users.component';
import { EventDetailsAttendeesComponent } from './views/event-details-attendees/event-details-attendees.component';
import { EventDetailsScheduleComponent } from './views/event-details-schedule/event-details-schedule.component';
import { EventDetailsContentComponent } from './views/event-details-content/event-details-content.component';
import { EventDetailsFeaturesComponent } from './views/event-details-features/event-details-features.component';
import { EventDetailsSettingsComponent } from './views/event-details-settings/event-details-settings.component';
import { EventDetailsDashboardComponent } from './views/event-details-dashboard/event-details-dashboard.component';
import { EventDetailsComponent } from './views/event-details/event-details.component';
import { EventsComponent } from './views/events/events.component';
import { ViewsModule } from './views/views.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EventDetailsBlogsComponent } from './views/event-details-blogs/event-details-blogs.component';
import { EventDetailsNotificationsComponent } from './views/event-details-notifications/event-details-notifications.component';
import { EventDetailsPrivatechatComponent } from './views/event-details-privatechat/event-details-privatechat.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuardService] },
  {
    path: 'event/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EventDetailsDashboardComponent },
      { path: 'settings', component: EventDetailsSettingsComponent },
      { path: 'features', component: EventDetailsFeaturesComponent },
      { path: 'content', component: EventDetailsContentComponent },
      { path: 'users', component: EventDetailsUsersComponent },
      { path: 'schedule', component: EventDetailsScheduleComponent },
      { path: 'attendees', component: EventDetailsAttendeesComponent },
      { path: 'speakers', component: EventDetailsSpeakersComponent },
      { path: 'sponsors', component: EventDetailsSponsorsComponent },
      { path: 'exhibitors', component: EventDetailsExhibitorsComponent },
      { path: 'maps', component: EventDetailsMapsComponent },
      { path: 'pages', component: EventDetailsPagesComponent },
      { path: 'forms', component: EventDetailsFormsComponent },
      { path: 'livepoll', component: EventDetailsLivepollComponent },
      { path: 'floorplan', component: EventDetailsFloorplanComponent },
      { path: 'weather', component: EventDetailsWeatherComponent },
      { path: 'externallinks', component: EventDetailsExternallinksComponent },
      { path: 'activityfeed', component: EventDetailsActivityfeedComponent },
      { path: 'publicchat', component: EventDetailsPublicchatComponent },
      { path: 'design', component: EventDetailsDesignComponent },
      { path: 'translations', component: EventDetailsTranslationsComponent },
      { path: 'attachedapps', component: EventDetailsAttachedAppsComponent },
      { path: 'blogs', component: EventDetailsBlogsComponent },
      { path: 'notifications', component: EventDetailsNotificationsComponent },
      { path: 'privatechat', component: EventDetailsPrivatechatComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
