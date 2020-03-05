import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

  constructor() { }

  @Input() user: any;

  ngOnInit() {
  }

  toggleModalRemoveUser() {
    
  }

}
