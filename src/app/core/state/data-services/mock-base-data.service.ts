import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../logging/log.service';
import { HttpService } from '../../http/http.service';
import { BaseDataService } from './base-data.service';
import { BaseRequest, BasePostRequest, BaseResponse, EntityRequest } from '../../models/request-response.models';

@Injectable()
export class MockBaseDataService extends BaseDataService {

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
    return this.httpService.getFile(request.resource)
      .map( res => res.json());
  }

   search<T>(request: BasePostRequest<T>): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.getFile(request.resource)
      .map( res => res.json());
  }

  loadDomains<T>(request: BaseRequest): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.getFile(request.resource)
      .map (response => response.json());
  }
}
