import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../core/logging/log.service';
import { HttpService } from '../core/http/http.service';
import { Constituent } from '../models/constituents/constituents.models';
import { ConstituentAggregate } from '../models/constituents/constituents-aggregates.models';
import { ConstituentDomains } from '../models/constituents/domains/constituents-domains.models';
import { AppStateService } from '../shared/state/app-state.service';

@Injectable()
export class ConstituentService {

  constructor(
    private HttpService: HttpService,
    private logService: LogService,
    private appStateService: AppStateService,
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
    if (this.appStateService.domains) {
      this.logService.log('domains already loaded');
      return Observable.of(this.appStateService.domains);
    }
    return this.HttpService.get('constituents/domains')
      .map (response => response.json());
  }
}
