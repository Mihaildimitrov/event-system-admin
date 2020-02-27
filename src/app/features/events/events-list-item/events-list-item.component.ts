// import { Event } from './../../../interfaces/event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss']
})
export class EventsListItemComponent implements OnInit {

  @Input() eventCode: string;
  @Output() eventDeleted = new EventEmitter<string>();

  showDeleteEventModal: Boolean = false;
  eventSettings;
  isEventSetingsDownloaded: Boolean = false;

  constructor(private dataService: DataService) { }

  doRemoveEvent() {
    this.eventDeleted.emit(this.eventSettings.event_code);
  }

  toggleModalRemoveEvent() {
    this.showDeleteEventModal = !this.showDeleteEventModal;
  }

  ngOnInit() {
    this.dataService.getEventData(this.eventCode).then((result: any) => {
      this.eventSettings = result;
      this.isEventSetingsDownloaded = true;
    }, (error: any) => {
      console.log(error);
    });
  }

}
