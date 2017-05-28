import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ConstituentSearchResponse,
        ConstituentSearchRequest } from '../../models/constituents/search/constituents-search.models';

@Injectable()
export class ConstituentSearchService {

  constructor(
    private HttpService: HttpService,
    private logService: LogService) {
    console.log('ConstituentSearchService cstr');
  }

  searchConstituents(request: ConstituentSearchRequest): Observable<ConstituentSearchResponse> {
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
  }
}
