import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { LogService }       from '../logging/log.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private logService: LogService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    this.logService.log('url', url);
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    //this.logService.log('AuthGuardService.checkLogin: ' + this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['login']);
    return false;
  }
}
