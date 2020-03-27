import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { EventDetailsSideNavigationComponent } from './event-details-side-navigation/event-details-side-navigation.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { InputSearchComponent } from './input-search/input-search.component';

@NgModule({
  declarations: [MainNavigationComponent, MainFooterComponent, EventDetailsSideNavigationComponent, SaveButtonComponent, LoadingSpinnerComponent, InputSearchComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MainNavigationComponent,
    MainFooterComponent,
    EventDetailsSideNavigationComponent,
    InputSearchComponent
  ]
})
export class MainElementsModule { }
