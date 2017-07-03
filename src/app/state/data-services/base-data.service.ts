import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ILoggedClass } from '../../core/logging/logged-class';
import { BaseRequest, BasePostResponse, BasePostRequest } from '../../models/base/base.models';
import { BaseSearchResponse } from '../../models/base/base.models';
import { BaseDomainsResponse } from '../../models/base/base.models';
import { BaseResponse, EntityRequest } from '../../models/root.models';

export class BaseDataService implements ILoggedClass {

  constructor(protected httpService: HttpService,
              protected logService: LogService) {
  };

   getClassName(): string {
    return (<any>this).constructor.name;
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
    return this.httpService.post(request.resource + '/search', JSON.stringify(request))
      .map( res => res.json());
  }

  loadDomains(request: BaseRequest): Observable<BaseDomainsResponse> {
    this.logService.log(this.getClassName() + '.loadDomains');
    return this.httpService.get(request.resource + '/domains')
      .map (response => response.json());
  }
}
