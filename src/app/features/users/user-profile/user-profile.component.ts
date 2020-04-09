import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userId: any;

  stillLoadingContent: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log('userId', this.userId);
    
    
    setTimeout(() => {
      this.stillLoadingContent = false;
    }, 2000);
  }

}
