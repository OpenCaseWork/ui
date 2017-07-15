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

  post(request: BasePostRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.post');
    let response = new BaseResponse();
    response.data = request.data;
    return Observable.of(response);
  }

  get(request: EntityRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.get');
    return this.httpService.getFile(request.resource)
      .map( res => res.json());
  }

   search(request: BasePostRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.getFile(request.resource)
      .map( res => res.json());
  }

  loadDomains(request: BaseRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.getFile(request.resource)
      .map (response => response.json());
  }
}
