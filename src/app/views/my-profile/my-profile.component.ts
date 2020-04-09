import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  currentLoggedUserId: string = '';

  ngOnInit() {
    this.currentLoggedUserId = JSON.parse(localStorage.getItem('loggedUserData')).uid;
  }

}
