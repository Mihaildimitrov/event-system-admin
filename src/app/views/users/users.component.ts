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
  stillLoadingUsersPage: boolean = false;
  searchWord: string = '';
  users = [];
  pagesFirstDocuments = [];
  pagesLastDocuments = [];
  showPrevBtn = false;
  showNextBtn = true;

  private getUsersPage(startPointDoc = null, nextPage = false, prevPage = false) {
    
    this.dataService.getSystemUsers(startPointDoc).then((usersResponse: any) => {
      if(this.stillLoading) { this.stillLoading = false; }
      if(this.stillLoadingUsersPage) { this.stillLoadingUsersPage = false; }
      if(!usersResponse.length) {
        this.showNextBtn = false;
      } else {
        if(usersResponse.length < 10) {
          this.showNextBtn = false;
        } else {
          this.showNextBtn = true;
        }

        if(nextPage) {
          this.pagesFirstDocuments.push(usersResponse[0]);
          this.pagesLastDocuments.push(usersResponse[usersResponse.length - 1]);
        } else if(prevPage) {
          this.pagesFirstDocuments.pop();
        } else {}
  
        this.users = usersResponse.map(x => x.data());

        if(this.pagesFirstDocuments.length >= 2) {
          this.showPrevBtn = true;
        } else {
          this.showPrevBtn = false;
        }
      }
 
    }, (error: any) => {
      console.log('error', error);
    });
  }

  ngOnInit() {
    this.getUsersPage(null, true);
  }

  nextPage() {
    this.stillLoadingUsersPage = true;
    let docRefToStartWith = this.pagesLastDocuments[this.pagesLastDocuments.length - 1]
    this.getUsersPage(docRefToStartWith, true);
  }

  prevPage() {
    this.stillLoadingUsersPage = true;
    if(this.pagesFirstDocuments.length === 1) {
      this.getUsersPage();
    } else {
      this.pagesFirstDocuments.pop();
      this.pagesLastDocuments.pop();
      this.getUsersPage(this.pagesFirstDocuments[this.pagesFirstDocuments.length - 1]);
    }
  }

}
