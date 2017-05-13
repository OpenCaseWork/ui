import { Injectable }                 from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc/dist';
import { LogService } from './../logging/log.service';
import { Headers }    from '@angular/http';

export const authorizationHeaderName = 'Authorization';
export const authorizationHeaderType = 'Bearer';

@Injectable()
export class HttpHeaderService {

  constructor(
    private oauthService: OAuthService,
    private logService: LogService) {
   }

  buildHeader(): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append(authorizationHeaderName, authorizationHeaderType + ' ' + this.oauthService.getAccessToken());
    this.logService.debug('buildHeader:' + headers.get(authorizationHeaderName));
    return headers;
  }
}
