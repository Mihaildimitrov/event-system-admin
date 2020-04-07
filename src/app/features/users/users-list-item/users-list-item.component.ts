import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() user: any;
  @Output() userDeleted = new EventEmitter<string>();
  showDeleteUserModal: Boolean = false;

  ngOnInit() {}

  doRemoveUser() {
    // TODO: Show spinner:
    this.dataService.deleteUser(this.user.uid).then((response: any) => {
      // TODO: Hide spinner:
      this.userDeleted.emit(this.user.uid);
      this.showDeleteUserModal = !this.showDeleteUserModal;
    }, (error: any) => {
      console.log('error', error);

    });
  }

  toggleModalRemoveUser() {
    this.showDeleteUserModal = !this.showDeleteUserModal;
  }

}
