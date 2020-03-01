import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-details-side-navigation',
  templateUrl: './event-details-side-navigation.component.html',
  styleUrls: ['./event-details-side-navigation.component.scss']
})
export class EventDetailsSideNavigationComponent implements OnInit {

  eventSettings;
  isStillLoading: Boolean = true;
  eventType: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit() {
    const currentEventCode: any = this.route.snapshot.params['id'];

    this.dataService.getEventData(currentEventCode).then((result: any) => {
      console.log('NOT Real time doc => ', result);
      this.eventSettings = result;
      this.eventType = this.eventSettings.event_type;
      this.isStillLoading = false;
    }, (error: any) => {
      console.log(error);
    });

    let firestoreEventConfigurationsReference = this.dataService.getFirestoreEventConfigurationsReference(currentEventCode);
    firestoreEventConfigurationsReference.onSnapshot(function(doc) {
      console.log('Real time doc => ', doc.data());
      this.eventSettings = doc.data();
      this.eventType = this.eventSettings.event_type;
      this.isStillLoading = false;
      console.log(this.eventType);
    });
  }

}
