import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dataService: DataService) { }

  stillLoading: boolean = true;
  searchWord: string = '';
  users = [];
  pagesStartPoints = [];
  private usersDocs = [];

  private getUsersPage(startPointDoc = null) {
    
    this.dataService.getSystemUsers(startPointDoc).then((usersResponse: any) => {
      // console.log('usersResponse', usersResponse);

      if(!this.users.length) {
        this.stillLoading = false;
      }

      if(true) {
        this.stillLoading = false;
      }

      this.usersDocs = usersResponse;
      this.pagesStartPoints.push(usersResponse[0]);
      this.users = usersResponse.map(x => x.data());
    }, (error: any) => {
      console.log('error', error);
    });
  }

  ngOnInit() {
    this.getUsersPage();
  }

  nextPage() {
    this.stillLoading = true;
    this.getUsersPage(this.usersDocs[this.usersDocs.length - 1]);
  }

  prevPage() {
    this.stillLoading = true;
    this.getUsersPage(this.pagesStartPoints[this.pagesStartPoints.length - 2]);
    this.pagesStartPoints.splice(0, 2);
    console.log(this.pagesStartPoints)
  }

}
