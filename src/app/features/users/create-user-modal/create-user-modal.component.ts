import { AuthService } from 'src/app/services/authentication/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {

  // showCreateUserModal: boolean = false;
  newUserFormIsDirty: boolean = false;
  uploadingNewUserPhoto: boolean = false;
  newUserFormWrong: boolean = false;
  newUserFormUserExist: boolean = false;
  isCreatingUser: boolean = false;
  currentSelectedUserRole: string = '';
  userPhotoSrcValue: any = '../../../../assets/img/no_img.png';
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

  @Input() showModal: any = false;
  @Output() userCreated = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {}

  get getFormFieldRef() { return this.newUserForm.controls; }


  setNewUserRole() { this.currentSelectedUserRole = this.newUserForm.value.userRole; }

  toggleModal() {
    this.currentSelectedUserRole = '';
    if(this.showModal) {
      this.newUserForm.reset();
      this.newUserFormIsDirty = false;
    }
    this.showModal = !this.showModal;
    this.userPhotoSrcValue = '../../../../assets/img/no_img.png';
    this.modalClosed.emit(false);
  }

  onUserPhotoSelected(event) {
    console.log(event);
    this.uploadingNewUserPhoto = true;

    if(event.target.files.length) {
      let component_this = this;
      let reader = new FileReader();
      this.newUserForm.patchValue({userPhoto: event.target.files[0]});

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
    } else { console.log('Cancel ICON file upload!'); }
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
        this.showModal = !this.showModal;
        this.userPhotoSrcValue = '../../../../assets/img/no_img.png';
        
        this.userCreated.emit(result.uid);
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

}
