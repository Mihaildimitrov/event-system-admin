import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  signUpFormIsDirty: boolean = false;
  signUpFormWrong: boolean = false;
  signUpFormLoadingNow: boolean = false;
  signUpFormSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  get getFormFieldRef() { return this.signUpForm.controls; }

  ngOnInit() {}

  signUpUser() {
    this.signUpFormLoadingNow = true;
    this.signUpFormIsDirty = true;
    this.signUpFormWrong = false;
    this.signUpFormSuccess = false;
    
    if(this.signUpForm.value.email !== "" && this.signUpForm.value.password !== "") {

      this.authService.signUpUserWithNODEJS(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.firstName, this.signUpForm.value.lastName, 'admin', '/assets/img/user-avatar.png').then((result: any) => {
        console.log('result', result);

        this.authService.signInUser(this.signUpForm.value.email, this.signUpForm.value.password).then((result: any) => {
          this.signUpFormLoadingNow = false;
          this.signUpFormSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        }, (error: any) => {
          this.signUpFormLoadingNow = false;
          this.signUpFormWrong = true;
        });
      }, (error: any) => {
        console.log('error', error);
        this.signUpFormLoadingNow = false;
        this.signUpFormWrong = true;
      });
      
      // this.authService.signUpUser(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.firstName, this.signUpForm.value.lastName, '/assets/img/user-avatar.png').then((result: any) => {
      //   this.signUpFormLoadingNow = false;
      //   this.signUpFormSuccess = true;
      //   setTimeout(() => {
      //     this.router.navigate(['/dashboard']);
      //   }, 1000);
      // }, (error: any) => {
      //   this.signUpFormLoadingNow = false;
      //   this.signUpFormWrong = true;
      // });
    }

  }

  openSignIn() {
    this.router.navigate(['/signin']);
  }
}
