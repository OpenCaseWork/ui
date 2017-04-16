import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute}  from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService }            from '../../core/auth.service';
//import { authServiceProvider }    from '../../core/auth.service.factory';
import { LogService }             from '../../core/logging/log.service';
import { RouteUrlDashboard }      from '../../app-routing.urls';

/** LoginComponent handles login functionality for application */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 // providers: [authServiceProvider]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  private returnUrl: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private logService: LogService) { }

  /** sets returnUrl to navigate to after login is successful */
  ngOnInit() {
    // reset login status
    // TODO: replace calls to authService.logout to instead navigate to login?
    // this.authService.logout();
    // get return url from route parameters or default to 'olb'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || RouteUrlDashboard();
  }

  login() {
    console.log('LoginComponent login starting');
    this.authService.login(this.username, this.password)
    .then ((response) => {
      console.log('LoginComponent login navigateToUrl');
      this.navigateToUrl();
    })
    .catch((err) => {
      console.log('LoginComponent login call error ', err);
      // this.handleError('Login Failed');
    });
    console.log('LoginComponent login exiting');
  }

  navigateToUrl() {
      this.router.navigate([this.returnUrl]);
  }

  handleError(err: ConstrainDOMStringParameters) {
    // TODO: display error to user in view
    this.logService.error(err);
  }

}
