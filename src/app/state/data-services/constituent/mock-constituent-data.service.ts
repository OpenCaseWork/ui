import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../../core/logging/log.service';
import { HttpService } from '../../../core/http/http.service';
import { ILoggedClass } from '../../../core/logging/logged-class';
import { BaseDataService } from './../base-data.service';
import { BaseSearchRequest } from '../../../core/state/base-search-request';
import { BaseSearchResponse } from '../../../core/state/base-search-response';

@Injectable()
export class MockConstituentDataService {

  constructor(
    protected httpService: HttpService,
    protected logService: LogService) {
  }

  search<T>(request: BaseSearchRequest): Observable<BaseSearchResponse<T>> {
    return this.httpService.getFile('constituents/search')
      .map( res => res.json());
  }
}
