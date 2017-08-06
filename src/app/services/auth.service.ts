import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  loginUser(authToken:string) {
    this.setAuthToken(authToken);
    this.router.navigate(['']);
  }

  logoutUser() {
    this.removeAuthToken();
    window.location.href = 'https://nextcaller.com/';
  }

  userIsAuthenticated():boolean {
    return !!this.getAuthToken();
  }

  /* --- Local Storage helpers --- */

  setAuthToken(authToken:string) {
    localStorage.setItem('nctoken', authToken);
  }

  getAuthToken():string {
    return localStorage.getItem('nctoken');
  }

  removeAuthToken() {
    localStorage.removeItem('nctoken');
  }

}
