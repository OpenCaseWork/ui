import { Injectable } from '@angular/core';
import { SelectItem } from '../../models/domains/domains.models';

@Injectable()
export class DomainService {

  Titles: Array<SelectItem>;
  idleSeconds: number; // time in seconds before the browser triggers warning for inactivity
  idleCountdownSeconds: number; // time in seconds that browser gives user to respond to inactivity warning
  hmr: boolean;
  apiBaseUrl: string;
  idServer: string;
  apiUrl: string;

  constructor() {
  }

}
