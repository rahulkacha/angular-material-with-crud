import { CoreService } from 'src/app/services/core/core.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private router: Router
  ) {}

  logIn(jwt: any): void {
    this.isLoggedIn = true;
    // store local loggedIn state in localStorage
    this.coreService.openSnackBar('you are logged In!', 'success', 750);
    this.router.navigate(['/admin/home']);
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.setItem('accessToken', jwt.accessToken);
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
  }

  getJwt(formData: any): any | JSON {
    console.log('here');
    return this.http.post('http://localhost:5000/user/login', formData);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}
