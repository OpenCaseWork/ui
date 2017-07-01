import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ILoggedClass } from '../../core/logging/logged-class';
import { BaseSearchRequest } from '../../core/state/base-search-request';
import { BaseSearchResponse } from '../../core/state/base-search-response';

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

/*
    loadDomains(): Observable<BaseDom> {
    if (this.appStateService.domains) {
      this.logService.log('domains already loaded');
      return Observable.of(this.appStateService.domains);
    }
    return this.HttpService.get('constituents/domains')
      .map (response => response.json());
  }*/
}
