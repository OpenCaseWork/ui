import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrlLogin } from '../app-routing.urls';
import { EnvironmentService } from './environment.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class SessionService {

  constructor(
    private router: Router,
    private environmentService: EnvironmentService,
    private authService: AuthService) {
  };

  logout(): void {
    this.authService.logout();
    this.router.navigate([RouteUrlLogin()]);

    // TODO: clear out local storage
  }
}
