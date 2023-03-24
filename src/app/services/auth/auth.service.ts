import { CoreService } from 'src/app/services/core/core.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

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
    // decode the token and check the user_role and redirect to respective routes
    const decodedJWT: any = jwt_decode(jwt.accessToken);
    const role: number = decodedJWT.user_role;

    if (role === 1) {
      this.router.navigate(['/admin/home']);
    } else {
      this.router.navigate(['/user/home']);
    }
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.setItem('accessToken', jwt.accessToken);
    localStorage.setItem('role', String(role));
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  }

  getJwt(formData: any): any | JSON {
    return this.http.get('http://localhost:5000/user/login', formData);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getRole(): number {
    const role: any = localStorage.getItem('role')
      ? localStorage.getItem('role')
      : false;
    return +role;
  }
}
