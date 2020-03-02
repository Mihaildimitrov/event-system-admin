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
  @Input() eventData: any;
  @Output() eventDeleted = new EventEmitter<string>();

  showDeleteEventModal: Boolean = false;

  constructor(private dataService: DataService) { }

  doRemoveEvent() {
    this.eventDeleted.emit(this.eventData.event_code);
  }

  toggleModalRemoveEvent() {
    this.showDeleteEventModal = !this.showDeleteEventModal;
  }

  ngOnInit() {}

}
