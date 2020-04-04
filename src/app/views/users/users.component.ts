import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dataService: DataService, private authService: AuthService) { }

  stillLoading: boolean = true;
  stillLoadingUsersPage: boolean = false;
  searchWord: string = '';
  users = [];
  pagesFirstDocuments = [];
  pagesLastDocuments = [];
  showPrevBtn = false;
  showNextBtn = true;


  showCreateUserModal: boolean = false;
  isCreatingUser: boolean = false;
  userCreatedSuccessfullyAlertVisibility: boolean = false;
  newUserFormIsDirty: boolean = false;
  newUserFormWrong: boolean = false;
  newUserFormUserExist: boolean = false;
  newUserForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  private showUserCreateSuccessfullyMessage() {
    this.userCreatedSuccessfullyAlertVisibility = true;
    setTimeout(() => {
      this.userCreatedSuccessfullyAlertVisibility = false;
    }, 5000);
  }

  private getUsersPage(startPointDoc = null, nextPage = false, prevPage = false) {

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
    this.searchWord = '';
    this.stillLoadingUsersPage = true;
    this.users = [];
    this.pagesFirstDocuments = [];
    this.pagesLastDocuments = [];
    this.showPrevBtn = false;
    this.showNextBtn = true;
    this.getUsersPage(null, true);
  }

  toggleModal () {
    if(this.showCreateUserModal) {
      this.newUserForm.reset();
      this.newUserFormIsDirty = false;
    }
    this.showCreateUserModal = !this.showCreateUserModal;
  }

  onCreateUser() {
    if(this.newUserForm.value.email !== "" && this.newUserForm.value.password !== "") {
      this.isCreatingUser = true;
      this.newUserFormIsDirty = true;
      this.newUserFormWrong = false;
      this.newUserFormUserExist = false;
      
      this.authService.signUpUserWithNODEJS(this.newUserForm.value.email, this.newUserForm.value.password, this.newUserForm.value.firstName, this.newUserForm.value.lastName, 'admin', '/assets/img/user-avatar.png').then((result: any) => {
        this.isCreatingUser = false;
        this.newUserForm.reset();
        this.newUserFormIsDirty = false;
        this.showCreateUserModal = !this.showCreateUserModal;
        this.showUserCreateSuccessfullyMessage();
        this.resetSearchUsers();
      }, (error: any) => {
        this.isCreatingUser = false;
        if(error === 'auth/email-already-exists') {
          this.newUserFormUserExist = true;
        } else {
          this.newUserFormWrong = true;
        }
      });
    }

  }

  get getFormFieldRef() { return this.newUserForm.controls; }

}
