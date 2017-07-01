import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgIdleModule } from '@ng-idle/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MockAuthService } from './auth/mock.auth.service';
import { LogService } from './logging/log.service';
import { EnvironmentService } from './environment.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AuthServiceProvider } from './auth/auth.service.provider';
import { SessionService } from './session/session.service';
import { IdleService } from './session/idle.service';

@NgModule({
  imports: [
    OAuthModule.forRoot(),
    NgIdleModule.forRoot(),
    HttpModule
  ],
  declarations: [
  ],
  providers: [
    AuthGuardService,
    AuthServiceProvider,
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
