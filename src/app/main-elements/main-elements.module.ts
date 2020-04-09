import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { EventDetailsSideNavigationComponent } from './event-details-side-navigation/event-details-side-navigation.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';

@NgModule({
  declarations: [
    MainNavigationComponent, 
    MainFooterComponent, 
    EventDetailsSideNavigationComponent, 
    SaveButtonComponent, 
    LoadingSpinnerComponent, 
    InputSearchComponent, 
    EmptyStateComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MainNavigationComponent,
    MainFooterComponent,
    EventDetailsSideNavigationComponent,
    InputSearchComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent
  ]
})
export class MainElementsModule { }
