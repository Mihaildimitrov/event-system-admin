import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });
  resetPasswordFormIsDirty: boolean = false;
  resetPasswordFormWrong: boolean = false;
  resetPasswordFormLoadingNow: boolean = false;
  resetPasswordFormSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get getFormFieldRef() { return this.resetPasswordForm.controls; }

  resetUserPassword() {
    this.resetPasswordFormLoadingNow = true;
    this.resetPasswordFormIsDirty = true;
    this.resetPasswordFormWrong = false;
    this.resetPasswordFormSuccess = false;
    
    if(this.resetPasswordForm.value.email !== "") {
      this.authService.sendPasswordResetEmail(this.resetPasswordForm.value.email).then((result: any) => {
        this.resetPasswordFormLoadingNow = false;
        this.resetPasswordFormSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000);
      }, (error: any) => {
        this.resetPasswordFormLoadingNow = false;
        this.resetPasswordFormWrong = true;
      });
    }
  }

  openSignIn() {
    this.router.navigate(['/signin']);
  }

}
