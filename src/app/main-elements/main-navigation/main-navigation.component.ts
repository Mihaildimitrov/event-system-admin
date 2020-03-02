import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  currentLoggedUser: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('Current logged user: ', this.authService.currentLoggedUserData);
    console.log('User UID: ', this.authService.currentLoggedUserData.uid);

    this.authService.getUserFields(this.authService.currentLoggedUserData.uid).then((result: any) => {
      console.log('User DATA: ', result);
      this.currentLoggedUser = result;
      console.log('this.currentLoggedUser', this.currentLoggedUser);
    }, (error: any) => {
      console.log(error);
    });
  }

  logOutUser() {
    this.authService.signOutUser().then((result: any) => {
      this.router.navigate(['/signin']);
    }, (error: any) => {});
  }


}
