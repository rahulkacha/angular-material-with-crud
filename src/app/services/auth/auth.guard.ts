import { CoreService } from './../core/core.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private coreService: CoreService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
      ? localStorage.getItem('isLoggedIn')
      : false;

    if (isLoggedIn === 'true') {
      const userRole = this.authService.getRole(); //from local storage after login
      if (route.data['role'] === 1 && userRole === 1) {
        //for admin
        return true;
      } else if (route.data['role'] === 3 && userRole === 3) {
        // for user
        return true;
      }
      this.coreService.openSnackBar('unauthorized!', 'ok', 1500);
      this.router.navigate(['/login']);
      return false;
    }
    this.coreService.openSnackBar('unauthorized!', 'ok', 1500);
    this.router.navigate(['/login']);
    return false;
  }
}
