import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../core/logging/log.service';
import { HttpService } from '../core/http/http.service';
import { Constituent,
          ConstituentDemographics } from './models/constituent';
import { ConstituentDomains } from './models/constituent-domains';

@Injectable()
export class ConstituentService {
  public domains: ConstituentDomains;

  constructor(
    private HttpService: HttpService,
    private logService: LogService
    ) {
  }

  constituent$(Id: number): Observable<Constituent> {
    this.logService.log('ConstituentService.getConstituent');

    return Observable.create((observer) => {
    this.HttpService.get('constituents/' + Id)
      .subscribe(
        response => {
          observer.next(response.json());
        },
        error => {
          this.logService.log(error);
        },
        () => { observer.complete(); console.log('ConstituentService.getConstituent onComplete'); }
      );
    });
  }

  domain$(): Observable<ConstituentDomains> {
    this.logService.log('ConstituentService.getDomains');
    if (this.domains) {
      return Observable.of(this.domains);
    }
    return Observable.create((observer) => {
    this.HttpService.get('constituents/domains')
      .subscribe(
        response => {
          observer.next(response.json());
          this.domains = response.json();
        },
        error => {
          this.logService.log(error);
        },
        () => { observer.complete(); console.log('ConstituentService.getDomains onComplete'); }
      );
    });
  }
}
