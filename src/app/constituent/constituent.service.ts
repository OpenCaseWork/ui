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
  //public constituent$: Observable<Constituent>;

  constructor(
    private HttpService: HttpService,
    private logService: LogService
    ) {
  }

 saveConstituent$(constituent: Constituent): Observable<Constituent> {
    let body = JSON.stringify(constituent);
    this.logService.log('ConstituentService.saveConstituent:' + body);

    return Observable.create((observer) => {
      this.HttpService.post('constituents/', body)
        .subscribe(
        response => {
          observer.next(response.json());
        },
        error => {
          this.logService.log(error);
        },
        () => { observer.complete(); console.log('ConstituentService.saveConstituent onComplete'); }
      );
    });
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
