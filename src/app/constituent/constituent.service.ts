import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { LogService } from '../../core/logging/log.service';
//import { HttpService } from '../../core/http/http.service';
//import { ConstituentSearchResponse } from './constituent-search.models';
//import { ConstituentSearchRequest } from './constituent-search.models';

@Injectable()
export class ConstituentService {

  constructor(
    //private HttpService: HttpService,
    //private logService: LogService
    ) {
  }

  /*searchConstituents(request: ConstituentSearchRequest): Observable<ConstituentSearchResponse> {
    let returnData: ConstituentSearchResponse;
    this.logService.log('ConstituentSearchService.searchConstituents');

    return Observable.create((observer) => {
    this.HttpService.post('constituents/', JSON.stringify(request))
      .subscribe(
        response => { observer.next(response.json()); },
        error => { this.logService.log(error); },
        () => { observer.complete(); console.log('ConstituentSearchService.searchConstituents onComplete'); }
      );
    });
  }*/
}
