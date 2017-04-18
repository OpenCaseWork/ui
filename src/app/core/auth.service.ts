import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { RouteUrlLogin } from '../app-routing.urls';
import { EnvironmentService } from './environment.service';

@Injectable()
// see https://auth0.com/blog/angular-2-authentication/ for some implementation concepts
export class AuthService {
  private loggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private environmentService: EnvironmentService,
    private oauthService: OAuthService) {

    // console.log('AuthService.constructor oauthService', this.oauthService);
    // The SPA's id. Register SPA with this id at the auth-server
    this.oauthService.clientId = 'olb-resource-owner';

    // set the scope for the permissions the client should request
    // The auth-server used here only returns a refresh token (see below), when the scope offline_access is requested
    this.oauthService.scope = 'openid profile email offline_access olbapi';

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // Set a dummy secret
    // Please note that the auth-server used here demand the client to transmit a client secret, although
    // the standard explicitly cites that the password flow can also be used without it. Using a client secret
    // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
    // Using such a dummy secreat is as safe as using no secret.
    this.oauthService.dummyClientSecret = 'olbui';

    // this.oauthService.redirectUri = 'http://localhost:4200/index.html';

    this.oauthService.oidc = true;

    // Load Discovery Document and then try to login the user
    let url = this.environmentService.idServer + '.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      // Do what ever you want here
    });
  }

  login(userName: string, password: string): Promise<boolean> {
    // TODO: capture tokens into local storage
    // Return a new Promise with boolean to the caller
    // If authentication succeeds, resolve and return true
    // Upon authentication failure, reject and return false
    // Can return any and reject caught error, too.
    return new Promise<boolean>((resolve, reject) => {
      console.log('before oauthService call');
      this.oauthService
        .fetchTokenUsingPasswordFlowAndLoadUserProfile(userName, password)
        .then((response) => {
          console.log('AuthService.login success', response);
          this.loggedIn = true;
          return resolve(this.loggedIn);
        })
        .catch((err) => {
          console.log('AuthService.login error', err);
          this.loggedIn = false;
          return reject(this.loggedIn);
        });
    });
  }

  /**
  * Used by auth guard to determine if user is logged in
  */
  isLoggedIn() {
    // always says you're logged in for development,
    // to prevent auto-navigation on refresh of app
    if (this.environmentService.isProduction === false) {
      return true;
    } else {
      return this.loggedIn;
    }
  }

  logout(): void {
    this.loggedIn = false;
    // Route to login page;
    console.log('log out');

    // TODO: clear out local storage
  }
}
