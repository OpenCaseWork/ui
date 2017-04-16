import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockAuthService {
    private loggedIn = false;

    constructor() {
        console.log('i was called!');
    }

    redirectUrl: string;
    login(username: string, password: string): Promise<boolean> {
      this.loggedIn = true;      
      console.log('mock service');
      
      return new Promise<boolean> ((resolve, reject) => {
      console.log( 'before oauthService call' );
        return resolve(this.loggedIn);
      });
       

    }
    isLoggedIn() { return true; }
    logout(): void {
        console.log('i tried to log out');
    }
}
