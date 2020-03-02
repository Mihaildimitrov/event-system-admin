import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-event-details-features',
  templateUrl: './event-details-features.component.html',
  styleUrls: ['./event-details-features.component.scss']
})
export class EventDetailsFeaturesComponent implements OnInit {

  private singleFeatures = [
    'speakers',
    'sponsors',
    'attendees',
    'exhibitors',
    'my_schedule',
    'my_bookmarks',
    'my_notes',
    'global_search',
    'livepoll',
    'notifications',
    'activity_feed',
    'public_chat',
    'private_chat'
  ];
  private multipleFeatures = [
    'schedule',
    'pages',
    'external_link',
    'menu_divider',
    'map',
    'weather',
    'blog',
    'form',
    'floor_plan'
  ];
  private premiumFeatures = [
    {
      title: 'Live poll',
      description: 'Engage users and get instant event feedback with real-time polling',
      type: 'livepoll',
      icon: 'fal fa-chart-bar',
      is_active: false
    },
    {
      title: 'Blog',
      description: 'List of blog posts.',
      type: 'blog',
      icon: 'fal fa-blog',
      is_active: false
    },
    {
      title: 'My Schedule',
      description: 'User are able to bookmark sessions.',
      type: 'my_schedule',
      icon: 'fal fa-calendar-check',
      is_active: false
    },
    {
      title: 'My bookmarks',
      description: 'Be able to bookmark account types.',
      type: 'my_bookmarks',
      icon: 'fal fa-star',
      is_active: false
    },
    {
      title: 'My Notes',
      description: 'User are able to create and save notes.',
      type: 'my_notes',
      icon: 'fal fa-copy',
      is_active: false
    },
    {
      title: 'Global Search',
      description: 'User are able to search information from all event data.',
      type: 'global_search',
      icon: 'fal fa-search',
      is_active: false
    },
    {
      title: 'Weather',
      description: 'Weather forecast for specific town.',
      type: 'weather',
      icon: 'fas fa-thermometer-half',
      is_active: false
    },
    {
      title: 'Notifications',
      description: 'Show list of all sent notifications.',
      type: 'notifications',
      icon: 'fal fa-bell',
      is_active: false
    },
    {
      title: 'External link',
      description: 'Be able to load external url.',
      type: 'external_link',
      icon: 'fal fa-link',
      is_active: false
    },
    {
      title: 'Floor plan',
      description: 'Floor plan for halls.',
      type: 'floor_plan',
      icon: 'fal fa-object-group',
      is_active: false
    },
    {
      title: 'Activity Feed',
      description: 'List of all posts.',
      type: 'activity_feed',
      icon: 'fal fa-wifi',
      is_active: false
    },
    {
      title: 'Forms',
      description: 'Submit a form.',
      type: 'form',
      icon: 'fal fa-edit',
      is_active: false
    },
    {
      title: 'Public Chat',
      description: 'Public chat room.',
      type: 'public_chat',
      icon: 'fal fa-comment-alt-lines',
      is_active: false
    },
    {
      title: 'Private Chat',
      description: 'Private chat rooms.',
      type: 'private_chat',
      icon: 'fal fa-comments',
      is_active: false
    }
  ];

  private saveFeaturesShowSuccessfullyMessage() {
    this.saveFeaturesShowSuccessMsg = true;
    setTimeout(() => {
      this.saveFeaturesShowSuccessMsg = false;
    }, 3000);
  }

  showEditEventFeatureModal: Boolean = false;
  showLoadingEditEventFeatureModal: Boolean = false;
  isSavingEventFeeatureData: Boolean = false;
  stillLoadingContent: Boolean = true;
  saveFeaturesShowSuccessMsg: Boolean = false;
  isSavingEventFeeaturesData: Boolean = false;
  currentEventSettings = {};
  currentFeatureEditData = {
    title_tra: {},
    selected_icon: '',
    is_hidden: false,
    is_require_login: false,
    show_on_home: true,
    title: ''
  };
  currentFeatureEditIndexInArray = null;
  availableFeatures = [
    {
      title: 'Menu divider',
      type: 'menu_divider',
      icon: 'fal fa-minus'
    },
    {
      title: 'Speakers',
      type: 'speakers',
      icon: 'fal fa-volume-up'
    },
    {
      title: 'Sponsors',
      type: 'sponsors',
      icon: 'fal fa-handshake'
    },
    {
      title: 'Attendees',
      type: 'attendees',
      icon: 'fal fa-users'
    },
    {
      title: 'Exhibitors',
      type: 'exhibitors',
      icon: 'fal fa-address-card'
    },
    {
      title: 'Schedule',
      type: 'schedule',
      icon: 'fal fa-calendar-alt'
    },
    {
      title: 'Pages',
      type: 'pages',
      icon: 'fal fa-file-alt'
    },
    {
      title: 'Google map',
      type: 'map',
      icon: 'fal fa-map-marker'
    }
  ];

  eventFeaturesData = {
    selected: [],
    premium: []
  };

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer !== event.container) {
      let featureItem;

      if(event.container.id === "available-features-list") {
        featureItem = this.eventFeaturesData.selected[event.previousIndex];

        if(this.multipleFeatures.indexOf(featureItem.type) > -1) {
            this.eventFeaturesData.selected.splice(event.previousIndex, 1);
        } else {
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
      } else {
        featureItem = this.availableFeatures[event.previousIndex];
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

        if(this.multipleFeatures.indexOf(featureItem.type) > -1) {
          this.availableFeatures.splice(event.previousIndex, 0, featureItem);
        }
      }
    } else {

      if(event.container.id === "selected-features-list") {
        moveItemInArray(this.eventFeaturesData.selected, event.previousIndex, event.currentIndex);
      }
    }
  }

  saveEventFeatures() {
    const currentEventCode: any = this.route.snapshot.parent.params['id'];
    this.isSavingEventFeeaturesData = true;

    this.dataService.saveEventFeatures(currentEventCode, this.eventFeaturesData).then((result: any) => {
      this.isSavingEventFeeaturesData = false;
      this.saveFeaturesShowSuccessfullyMessage();
    }, (error: any) => {
      console.log(error);
    });
  }

  removeSelectedFeature(featureindex) {
    let curFeatureData = this.eventFeaturesData.selected[featureindex];

    if(this.singleFeatures.indexOf(curFeatureData.type) > -1) {
      this.availableFeatures.unshift(curFeatureData);
    }
    this.eventFeaturesData.selected.splice(featureindex, 1);
  }

  togglePremiumFeature(featureIndex, chkValue) {
    this.eventFeaturesData.premium[featureIndex].is_active = chkValue;

    if(chkValue) {
      this.availableFeatures.push({
        title: this.eventFeaturesData.premium[featureIndex].title,
        type: this.eventFeaturesData.premium[featureIndex].type,
        icon: this.eventFeaturesData.premium[featureIndex].icon
      });
    } else {
      let currentIndexOfFeatureInSelected;
      let removeFromSelected = false;
      let currentIndexOfFeatureInAvailable;
      let currentFeatureType = this.eventFeaturesData.premium[featureIndex].type;

      for (let i = 0; i < this.eventFeaturesData.selected.length; i++) {
        if(this.eventFeaturesData.selected[i].type === currentFeatureType) {
          currentIndexOfFeatureInSelected = i;
          removeFromSelected = true;
        }
      }

      if(removeFromSelected) {
        this.eventFeaturesData.selected.splice(currentIndexOfFeatureInSelected, 1);
      }
      
      for (let i = 0; i < this.availableFeatures.length; i++) {
        if(this.availableFeatures[i].type === currentFeatureType) {
          currentIndexOfFeatureInAvailable = i;
        }
      }
      this.availableFeatures.splice(currentIndexOfFeatureInAvailable, 1);
    }
  }

  toggleEditFeatureModal(featureindex) {
    const currentEventCode: any = this.route.snapshot.parent.params['id'];
    this.currentFeatureEditData = {
      title_tra: {},
      selected_icon: '',
      is_hidden: false,
      is_require_login: false,
      show_on_home: true,
      title: ''
    };
    this.currentFeatureEditIndexInArray = featureindex;
    
    if(typeof this.eventFeaturesData.selected[featureindex]['data'] === 'undefined') {
      this.eventFeaturesData.selected[featureindex]['data'] = this.currentFeatureEditData;
    }
    this.currentFeatureEditData = this.eventFeaturesData.selected[featureindex];
    this.showEditEventFeatureModal = !this.showEditEventFeatureModal;
    this.showLoadingEditEventFeatureModal = true;

    this.dataService.getEventData(currentEventCode).then((result: any) => {
      this.showLoadingEditEventFeatureModal = false;
      this.currentEventSettings = result;
    }, (error: any) => {
      console.log(error);
    });

  }

  saveEventFeature(modalElemRef: any) {
    this.isSavingEventFeeatureData = true;
    this.eventFeaturesData.selected[this.currentFeatureEditIndexInArray] = this.currentFeatureEditData;
    const currentEventCode: any = this.route.snapshot.parent.params['id'];

    this.dataService.saveEventFeatures(currentEventCode, this.eventFeaturesData).then((result: any) => {
      this.isSavingEventFeeatureData = false;
      setTimeout(() => {
        this.showEditEventFeatureModal = !this.showEditEventFeatureModal;
      }, 500);
    }, (error: any) => {
      console.log(error);
    });

  }

  getFeatureTitleForCurrentLang(lang) {

    if(typeof this.currentFeatureEditData['data'].title_tra[lang] === 'undefined') {
      this.currentFeatureEditData['data'].title_tra[lang] = this.currentFeatureEditData.title;
    }
    return this.currentFeatureEditData['data'].title_tra[lang];
  }

  setFeatureTitleForCurrentLang(lang, value) {
    this.currentFeatureEditData['data'].title_tra[lang] = value;
  }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const currentEventCode: any = this.route.snapshot.parent.params['id'];
    let component_this = this;
    // Get all features data from DB:
    this.dataService.getEventFeatures(currentEventCode).then((result: any) => {

      if(result === false) {
        this.eventFeaturesData.premium = this.premiumFeatures;
      } else {
        if(!result.premium.length) {
          this.eventFeaturesData.premium = this.premiumFeatures;
        } else {
          this.eventFeaturesData.premium = result.premium;
        }
        
        if(result.selected.length) {
          this.eventFeaturesData.selected = result.selected;
        }
  
        // Add all not selected activ premium features in available list:
        this.eventFeaturesData.premium.filter(function(premiumFeature){
          let preFeatureIsSelected = false;
  
          if(premiumFeature.is_active) {
            component_this.eventFeaturesData.selected.filter(function(selectedFeature){
              if(premiumFeature.type == selectedFeature.type) {
                preFeatureIsSelected = true;
              }
            });
  
            if(!preFeatureIsSelected) {
              component_this.availableFeatures.push(premiumFeature);
            }
          }
        });
  
        // Remove all selected single features from available list items:
        this.availableFeatures = this.availableFeatures.filter(function(availableFeature){
          let is_exist = false;
          component_this.eventFeaturesData.selected.filter(function(selectedFeature){
        
            if((availableFeature.type == selectedFeature.type) && (component_this.singleFeatures.indexOf(availableFeature.type) > -1)) {
                is_exist = true;
            } 
          });
          
          if(!is_exist) { return true; }
          return false;
        });
  
      }

        // Hide loading mask:
        this.stillLoadingContent = false;
    }, (error: any) => {
      console.log(error);
    });
  }

}
