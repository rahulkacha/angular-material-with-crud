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
    console.log(isLoggedIn);
    console.log('type of islogin', typeof isLoggedIn);
    if (isLoggedIn === 'true') {
      console.log();
      return true;
    } else {
      this.coreService.openSnackBar('permission denied!', 'unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
