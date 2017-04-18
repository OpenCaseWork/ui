import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgIdleModule } from '@ng-idle/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { MockAuthService } from './mock/mock.auth.service';
import { LogService } from './logging/log.service';
import { IdleService } from './idle.service';
import { EnvironmentService } from './environment.service';
import { authServiceProvider } from './auth.service.factory';
import { SessionService } from './session.service';

@NgModule({
  imports: [
    OAuthModule.forRoot(),
    NgIdleModule.forRoot()
  ],
  declarations: [
  ],
  providers: [
    AuthGuardService,
    authServiceProvider,
    LogService,
    IdleService,
    EnvironmentService,
    SessionService
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
