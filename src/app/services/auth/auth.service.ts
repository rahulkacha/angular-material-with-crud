import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {}

  logIn(): void {
    this.isLoggedIn = true;
    // store local loggedIn state in localStorage
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
  }

  logOut(): void {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.removeItem('isLoggedIn');
  }
}
