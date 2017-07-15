import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../logging/log.service';
import { HttpService } from '../../http/http.service';
import { ILoggedClass } from '../../logging/logged-class';
import { BaseRequest, BaseResponse, BasePostRequest, EntityRequest } from '../../models/request-response.models';

@Injectable()
export class BaseDataService implements ILoggedClass {

  constructor(protected httpService: HttpService,
    protected logService: LogService) {
  };

  getClassName(): string {
    return (<any>this).constructor.name;
  }

  post(request: BasePostRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.post');
    return this.httpService.post(request.resource, JSON.stringify(request.data))
      .retryWhen(e => e.scan<number>((errorCount, err) => {
        if (errorCount >= 1) {
          throw err;
        }
        return errorCount + 1;
      }, 0).delay(1000))
      .map(res => res.json());
  }

  get(request: EntityRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.get');
    return this.httpService.get(request.resource + '/' + request.id)
      .retryWhen(e => e.scan<number>((errorCount, err) => {
        if (errorCount >= 1) {
          throw err;
        }
        return errorCount + 1;
      }, 0).delay(1000))
      .map(res => res.json());
  }

  search(request: BasePostRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.post(request.resource, JSON.stringify(request.data))
      .retryWhen(e => e.scan<number>((errorCount, err) => {
        if (errorCount >= 1) {
          throw err;
        }
        return errorCount + 1;
      }, 0).delay(1000))
      .map(res => res.json());
  }

  loadDomains(request: BaseRequest): Observable<BaseResponse> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.get(request.resource)
      .retryWhen(e => e.scan<number>((errorCount, err) => {
        if (errorCount >= 1) {
          throw err;
        }
        return errorCount + 1;
      }, 0).delay(1000))
      .map(response => response.json());
  }
}
