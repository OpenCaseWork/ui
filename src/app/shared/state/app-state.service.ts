import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';

@Injectable()
export class AppStateService {
  public domains: ConstituentDomains;

  constructor(
    private logService: LogService
    ) {
  }
}
