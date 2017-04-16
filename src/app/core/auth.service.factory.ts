import { AuthService } from './auth.service';
import { MockAuthService } from './mock/mock.auth.service';
import { LogService }      from './logging/log.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router}              from '@angular/router';
import { RouteUrlLogin }  from '../app-routing.urls';
import { EnvironmentService } from './environment.service';

// #docregion factory
let authServiceFactory = (router: Router, environmentService: EnvironmentService, oAuthService: OAuthService) => {
    if (environmentService.isProduction === false)
        return new MockAuthService();
    else
        return new AuthService(router,environmentService,oAuthService);
};
// #enddocregion factory

// #docregion provider
export let authServiceProvider =
  { provide: AuthService,
    useFactory: authServiceFactory,
    deps: [Router, EnvironmentService, OAuthService ]
  };
// #enddocregion provider