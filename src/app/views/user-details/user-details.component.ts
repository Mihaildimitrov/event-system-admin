import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
  }

}
