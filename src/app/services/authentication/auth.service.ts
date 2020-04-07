import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUserData: any = {};
  private FirebaseAuthReference: any = null;
  private currentUserSubject: BehaviorSubject<any>;
  public currentLoggedUser: Observable<any>;

  constructor(private dataService: DataService) { 
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('loggedUserStatus'));
    this.currentLoggedUser = this.currentUserSubject.asObservable();
    this.FirebaseAuthReference = this.dataService.getAuthReference();
    let self = this;

    this.FirebaseAuthReference.onAuthStateChanged(function(user) {
      
      if (user) {
          // console.log('user:', user);
          localStorage.setItem('loggedUserStatus', 'true');
          self.setFBTokenInCookie(user.ra);
          self.FirebaseAuthReference.currentUser.getIdTokenResult().then((idTokenResult) => {
            self.setCookieProp('currentLoggedUserRole', idTokenResult.claims.user_role);
          }).catch((error) => { console.log(error); });
      } else {
          localStorage.removeItem('loggedUserStatus');
          self.deleteCookieProp('currentLoggedUserRole');
          self.deleteCookieProp('firebaseToken');
      }
      self.loggedUserData = user;
      localStorage.setItem('loggedUserData', JSON.stringify(self.loggedUserData));
      self.currentUserSubject.next(localStorage.getItem('loggedUserStatus'));
    });
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get currentLoggedUserData() {
    return JSON.parse(localStorage.getItem('loggedUserData'));
  }

  getCurrentLoggedUserCustomClaims() {
    return new Promise((resolve, reject) => {
      return this.FirebaseAuthReference.currentUser.getIdTokenResult().then((result: any) => {
        resolve(result.claims);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  sendPasswordResetEmail(email: string) {
    return new Promise((resolve, reject) => {
      return this.dataService.sendPasswordResetEmail(email).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      return this.dataService.signInUser(email, password).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  signUpUser(email: string, password: string, firstName: string, lastName: string, userImage: string) {
    return new Promise((resolve, reject) => {
      return this.dataService.signUpUser(email, password, firstName, lastName, userImage).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  signUpUserWithNODEJS(email: string, password: string, firstName: string, lastName: string, role:string, userImage: string) {
    return new Promise((resolve, reject) => {
      return this.dataService.signUpUserWithNODEJS(email, password, firstName, lastName, role, userImage).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  signUpUserWithNODEJSV2(user: any) {
    return new Promise((resolve, reject) => {
      return this.dataService.signUpUserWithNODEJSV2(user).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  signOutUser() {
    return new Promise((resolve, reject) => {
      return this.dataService.signOutUser().then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  getUserFields(uid: string) {
    return new Promise((resolve, reject) => {
      return this.dataService.getUserFields(uid).then((result: any) => {
        resolve(result);
      }).catch(function(error: any) {
        reject(error);
      });
    });
  }

  
  setCookieProp(key: string, value: string) {
    document.cookie = key + "=" + value;
  }

  deleteCookieProp(key) {   
    document.cookie = key + '=; Max-Age=-99999999;';  
  }

  getCookiePropValue(key: string) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setFBTokenInCookie(token) {
    document.cookie = "firebaseToken=" + token;
  }

  getFBTokenCookie() {
    let name = "firebaseToken=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}
