import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ILoggedClass } from '../../core/logging/logged-class';
import { BaseSearchRequest } from '../../models/base/base.models';
import { BaseSearchResponse } from '../../models/base/base.models';
import { BaseDomainsResponse } from '../../models/base/base.models';
import { BaseDomainsRequest } from '../../models/base/base.models';

export class BaseDataService implements ILoggedClass {

  constructor(protected httpService: HttpService,
              protected logService: LogService) {
  };

   getClassName(): string {
    return (<any>this).constructor.name;
  }

   search<T>(request: BaseSearchRequest): Observable<BaseSearchResponse<T>> {
    this.logService.log(this.getClassName() + '.search');

    return this.httpService.post(request.resource + '/search', JSON.stringify(request))
      .map( res => res.json());
  }

  loadDomains(request: BaseDomainsRequest): Observable<BaseDomainsResponse> {
    return this.httpService.get(request.resource + '/domains')
      .map (response => response.json());
  }
}
