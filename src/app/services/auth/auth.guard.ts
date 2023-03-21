// @ts-ignore
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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | UrlTree
    | boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
      ? localStorage.getItem('isLoggedIn')
      : false;
    const accessToken = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : false;
    //verify the token from the backend
    if (isLoggedIn === 'true') {
      return true;
    } else {
      this.coreService.openSnackBar('permission denied!', 'unauthorized', 750);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
