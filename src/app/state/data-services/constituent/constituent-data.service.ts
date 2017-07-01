import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../../core/logging/log.service';
import { HttpService } from '../../../core/http/http.service';
import { ILoggedClass } from '../../../core/logging/logged-class';
import { BaseDataService } from './../base-data.service';
import { ConstituentSearchResponse,
        ConstituentSearchRequest } from '../../../models/constituents/search/constituents-search.models';

@Injectable()
export class ConstituentDataService extends BaseDataService {

  constructor(
    protected httpService: HttpService,
    protected logService: LogService) {
      super(httpService, logService);
      console.log(this.getClassName() + '.constructor');
  }

  /*searchConstituents(request: ConstituentSearchRequest): Observable<ConstituentSearchResponse> {
    let returnData: ConstituentSearchResponse;
    this.logService.log(this.getClassName() + '.searchConstituents');

    return this.httpService.post('constituents/search', JSON.stringify(request))
      .map( res => res.json());
  }*/
}
