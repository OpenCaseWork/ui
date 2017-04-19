import { AuthService } from './auth.service';
import { MockAuthService } from '../mock/mock.auth.service';
import { LogService } from '../logging/log.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { RouteUrlLogin } from '../../app-routing.urls';
import { EnvironmentService } from '../environment.service';

export function authServiceFactory(environmentService: EnvironmentService, oAuthService: OAuthService) {
  if (environmentService.isProduction === false) {
    return new MockAuthService();
  } else {
    return new AuthService(environmentService, oAuthService);
  }
};

export let authServiceProvider = {
  provide: AuthService,
  useFactory: authServiceFactory,
  deps: [EnvironmentService, OAuthService]
};
