import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, AfterViewInit {

  events: Event[] = [];
  isDownloadingEvents: Boolean = true;

  constructor(private dataService: DataService) {}

  private getEvents(refreshListing = false) {
    this.dataService.getAllEvents().then((result: any) => {

      if (refreshListing) {
        this.events = [];
      }

      result.forEach((event: any) => {
        console.log(event.data());
          this.events.push(event.data());
      });

      this.isDownloadingEvents = false;
    }, (error: any) => {
      this.isDownloadingEvents = false;
      console.log(error);
    });
  }

  onEventDeleted(eventId: string) {
    this.dataService.deleteEvent(eventId).then((result: boolean) => {
      this.getEvents(true);
    }, (error: any) => {
      console.log(error);
    });
  }

  refreshEventsList() {
    this.getEvents(true);
  }

  ngOnInit() {
    this.getEvents();
  }

  ngAfterViewInit() {

  }



}
