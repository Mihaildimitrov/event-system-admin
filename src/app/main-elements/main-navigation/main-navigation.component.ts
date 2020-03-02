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
    this.authService.getUserFields(this.authService.currentLoggedUserData.uid).then((result: any) => {
      this.currentLoggedUser = result;
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
