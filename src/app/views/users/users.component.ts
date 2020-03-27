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
    console.log('startPointDoc', startPointDoc);


    this.dataService.getSystemUsersV2(startPointDoc, this.searchWord).then((usersResponse: any) => {
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
    this.pagesFirstDocuments.pop();
    this.pagesLastDocuments.pop();

    if(this.pagesFirstDocuments.length === 1) {
      this.getUsersPage();
    } else {
      this.getUsersPage(this.pagesFirstDocuments[this.pagesFirstDocuments.length - 1]);
    }
  }

  searchUsers(searchWord) {
    console.log('Search by: ', searchWord);

    this.searchWord = searchWord;

    this.stillLoadingUsersPage = true;
    this.users = [];
    this.pagesFirstDocuments = [];
    this.pagesLastDocuments = [];
    this.showPrevBtn = false;
    this.showNextBtn = true;

    this.getUsersPage(null, true);

  }

  resetSearchUsers() {
    console.log('reset search....');
    this.searchWord = '';

    this.stillLoadingUsersPage = true;
    this.users = [];
    this.pagesFirstDocuments = [];
    this.pagesLastDocuments = [];
    this.showPrevBtn = false;
    this.showNextBtn = true;
    

    this.getUsersPage(null, true);
  }

}
