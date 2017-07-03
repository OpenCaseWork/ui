import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../../core/logging/log.service';
import { HttpService } from '../../../core/http/http.service';
import { BaseDataService } from './../base-data.service';
import { BaseRequest, BasePostRequest, BaseResponse } from '../../../models/base/base.models';
import { EntityRequest } from '../../../models/root.models';

@Injectable()
export class MockConstituentDataService extends BaseDataService {

  constructor(
    protected httpService: HttpService,
    protected logService: LogService) {
    super(httpService, logService);
  }

  post<T>(request: BasePostRequest<T>): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.post');
    let response = new BaseResponse<T>();
    response.data = request.data;
    return Observable.of(response);
  }

  get<T>(request: EntityRequest): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.get');
    return this.httpService.getFile('assets/test-data/constituent-aggregate.json')
      .map( res => res.json());
  }

   search<T>(request: BasePostRequest<T>): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.getFile('assets/test-data/constituent-search.json')
      .map( res => res.json());
  }

  loadDomains<T>(request: BaseRequest): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.getFile('assets/test-data/constituent-domains.json')
      .map (response => response.json());
  }
}
