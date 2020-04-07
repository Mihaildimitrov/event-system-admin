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

  userPhotoSrcValue: any = '../../../../assets/img/no_img.png';
  showCreateUserModal: boolean = false;
  isCreatingUser: boolean = false;
  userCreatedSuccessfullyAlertVisibility: boolean = false;
  newUserFormIsDirty: boolean = false;
  newUserFormWrong: boolean = false;
  newUserFormUserExist: boolean = false;
  uploadingNewUserPhoto: boolean = false;
  validUserRoles: Array<string> = [
    'administrator',
    'admin',
    'attendee',
    'speaker',
    'exhibitor',
    'sponsor'
  ];
  validUserSponsorLevels: Array<string> = [
    'bronze',
    'silver',
    'gold',
    'platinum'
  ];
  currentSelectedUserRole: string = '';
  newUserForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    company: new FormControl(''),
    position: new FormControl(''),
    description: new FormControl(''),
    companyName: new FormControl(''),
    userSponsorLevel: new FormControl(''),
    boothNumber: new FormControl(''),
    userPhoto: new FormControl(''),
    userRole: new FormControl('')
  });

  private showUserCreateSuccessfullyMessage() {
    this.userCreatedSuccessfullyAlertVisibility = true;
    setTimeout(() => { this.userCreatedSuccessfullyAlertVisibility = false; }, 5000);
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

        console.log('this.users', this.users);

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
    this.currentSelectedUserRole = '';
    if(this.showCreateUserModal) {
      this.newUserForm.reset();
      this.newUserFormIsDirty = false;
    }
    this.showCreateUserModal = !this.showCreateUserModal;
    this.userPhotoSrcValue = '../../../../assets/img/no_img.png';
  }

  onCreateUser() {

    if(this.newUserForm.value.email !== "" && this.newUserForm.value.password !== "" && this.newUserForm.value.userRole !== "") {
      this.isCreatingUser = true;
      this.newUserFormIsDirty = true;
      this.newUserFormWrong = false;
      this.newUserFormUserExist = false;

      let userObjectTosave = {
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password,
        role: this.newUserForm.value.userRole,
        firstName: this.newUserForm.value.firstName || '',
        lastName: this.newUserForm.value.lastName || '',
        photo: this.newUserForm.value.userPhoto || '/assets/img/user-avatar.png',
        companyName: this.newUserForm.value.companyName || '',
        userSponsorLevel: this.newUserForm.value.userSponsorLevel || '',
        boothNumber: this.newUserForm.value.boothNumber || '',
        company: this.newUserForm.value.company || '',
        position: this.newUserForm.value.position || '',
        description: this.newUserForm.value.descriptio || ''
      };
      console.log('userObjectTosave', userObjectTosave);

      this.authService.signUpUserWithNODEJSV2(userObjectTosave).then((result: any) => {
        this.isCreatingUser = false;
        this.newUserForm.reset();
        this.newUserFormIsDirty = false;
        this.showCreateUserModal = !this.showCreateUserModal;
        this.userPhotoSrcValue = '../../../../assets/img/no_img.png';
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

  setNewUserRole() { this.currentSelectedUserRole = this.newUserForm.value.userRole; }

  onUserPhotoSelected(event) {
    console.log(event);
    this.uploadingNewUserPhoto = true;

    if(event.target.files.length) {
      let component_this = this;
      let reader = new FileReader();
      this.newUserForm.patchValue({userPhoto: event.target.files[0]});
      console.log('imgToUpload', event.target.files[0]);

      if (/^image\//i.test(event.target.files[0].type)) {
          reader.onloadend = function(e) {
            component_this.userPhotoSrcValue = reader.result;
            component_this.uploadingNewUserPhoto = false;
          };
          reader.onerror = function(error) {
            console.log(error);
            component_this.uploadingNewUserPhoto = false;
          };
          reader.readAsDataURL(event.target.files[0]);
      } 
    } else {
      console.log('Cancel ICON file upload!');
    }

  } 

  onUserDeleted(userId: string) {
    console.log('Deleted User: ' + userId + ' . Must reload listing....');
    this.resetSearchUsers();
  }

}
