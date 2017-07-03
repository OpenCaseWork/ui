import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../../core/logging/log.service';
import { HttpService } from '../../../core/http/http.service';
import { ILoggedClass } from '../../../core/logging/logged-class';
import { BaseDataService } from './../base-data.service';
import { BaseRequest, BasePostRequest, BasePostResponse, BaseDomainsResponse } from '../../../models/base/base.models';
import { BaseSearchResponse } from '../../../models/base/base.models';
import { EntityRequest } from '../../../models/root.models';

@Injectable()
export class MockConstituentDataService extends BaseDataService {

  constructor(
    protected httpService: HttpService,
    protected logService: LogService) {
    super(httpService, logService);
  }

  post<T>(request: BasePostRequest<T>): Observable<BasePostResponse<T>> {
    this.logService.log(this.getClassName() + '.post');
    return this.httpService.post(request.resource, JSON.stringify(request.data))
      .map( res => res.json());
  }

  get<T>(request: EntityRequest): Observable<BasePostResponse<T>> {
    this.logService.log(this.getClassName() + '.get');
    return this.httpService.get(request.resource + '/' + request.id)
      .map( res => res.json());
  }

   search<T>(request: BaseRequest): Observable<BaseSearchResponse<T>> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.getFile('assets/test-data/constituent-search.json')
      .map( res => res.json());
  }

  loadDomains(request: BaseRequest): Observable<BaseDomainsResponse> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.get(request.resource + '/domains')
      .map (response => response.json());
  }
}
