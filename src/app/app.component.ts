import { Component } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserLogged;

  constructor(private authService: AuthService) {
    this.authService.currentLoggedUser.subscribe(user => this.isUserLogged = user);
  }
}
