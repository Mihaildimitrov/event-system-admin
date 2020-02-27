import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('')
  });
  signInFormIsDirty: boolean = false;
  signInFormWrogCredentials: boolean = false;
  signInFormLoggingNow: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  get getFormFieldRef() { return this.signInForm.controls; }

  signInUser() {
    this.signInFormLoggingNow = true;
    this.signInFormIsDirty = true;
    this.signInFormWrogCredentials = false;

    if(this.signInForm.value.email !== "" && this.signInForm.value.password !== '') {
      this.authService.signInUser(this.signInForm.value.email, this.signInForm.value.password).then((result: any) => {
        this.signInFormLoggingNow = false;
        this.router.navigate(['/dashboard']);
      }, (error: any) => {
        this.signInFormLoggingNow = false;
        this.signInFormWrogCredentials = true;
      });
    } 
  }

  changePassword() {
    this.router.navigate(['/resetPassword']);
  }

  registerUser() {
    this.router.navigate(['/signup']);
  }

}
