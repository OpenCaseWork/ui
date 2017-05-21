import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../core/logging/log.service';
import { HttpService } from '../core/http/http.service';
import { Constituent,
        ConstituentDemographics } from './models/constituent';

@Injectable()
export class ConstituentService {

  constructor(
    private HttpService: HttpService,
    private logService: LogService
    ) {
  }

  getConstituent(Id: number): Observable<Constituent> {
    let returnData: Constituent;
    this.logService.log('ConstituentService.getConstituent');

    return Observable.create((observer) => {
    this.HttpService.get('constituents/' + Id)
      .subscribe(
        response => { observer.next(response.json()); },
        error => { this.logService.log(error); },
        () => { observer.complete(); console.log('ConstituentService.getConstituent onComplete'); }
      );
    });
  }
}
