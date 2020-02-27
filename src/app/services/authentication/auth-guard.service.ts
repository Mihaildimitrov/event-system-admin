import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentLoggedUserStatus = this.authService.currentUserValue;
    const currentLoggedUserCookieToken = this.authService.getFBTokenCookie();
    const currentUrl = this.router.url;
    const nextUrl = state.url;

    if((currentLoggedUserStatus == 'true' || currentLoggedUserStatus == true) && currentLoggedUserCookieToken && currentLoggedUserCookieToken.split('.').length === 3) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false; 
    }
  }

}
