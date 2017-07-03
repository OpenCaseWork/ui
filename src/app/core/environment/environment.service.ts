import { Injectable } from '@angular/core';
import { environment }  from '../../../environments/environment';

@Injectable()
export class EnvironmentService {

  isProduction: boolean;
  idleSeconds: number; // time in seconds before the browser triggers warning for inactivity
  idleCountdownSeconds: number; // time in seconds that browser gives user to respond to inactivity warning
  hmr: boolean;
  apiBaseUrl: string;
  idServer: string;
  apiUrl: string;
  useMockData: boolean;

  constructor() {
    this.isProduction = environment.production;
    this.idleSeconds = environment.idleSeconds;
    this.idleCountdownSeconds = environment.idleCountdownSeconds;
    this.hmr = environment.hmr;
    this.apiBaseUrl = environment.apiBaseUrl;
    this.idServer = environment.idServer;
    this.apiUrl = this.apiBaseUrl + 'api/';
    this.useMockData = environment.useMock;
  }

}
