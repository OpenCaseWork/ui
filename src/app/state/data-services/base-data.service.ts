import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ILoggedClass } from '../../core/logging/logged-class';
import { BaseRequest, BaseResponse, BasePostRequest } from '../../models/base/base.models';
import { EntityRequest } from '../../models/root.models';

export class BaseDataService implements ILoggedClass {

  constructor(protected httpService: HttpService,
              protected logService: LogService) {
  };

   getClassName(): string {
    return (<any>this).constructor.name;
  }

  post<T>(request: BasePostRequest<T>): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.post');
    return this.httpService.post(request.resource, JSON.stringify(request.data))
      .map( res => res.json());
  }

  get<T>(request: EntityRequest): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.get');
    return this.httpService.get(request.resource + '/' + request.id)
      .map( res => res.json());
  }

   search<T>(request: BasePostRequest<T>): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.search');
    return this.httpService.post(request.resource, JSON.stringify(request.data))
      .map( res => res.json());
  }

  loadDomains<T>(request: BaseRequest): Observable<BaseResponse<T>> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.get(request.resource)
      .map (response => response.json());
  }
}
