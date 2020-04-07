import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  @Input() users: any;
  @Output() userDeleted = new EventEmitter<string>();

  ngOnInit() {}

  onUserDeleted(userId: string) {
    this.userDeleted.emit(userId);
  }
}
