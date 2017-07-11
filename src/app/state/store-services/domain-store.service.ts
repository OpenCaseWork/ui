import { Injectable }     from '@angular/core';
import { Store }          from '@ngrx/store';
import { Observable }     from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import { createSelector } from 'reselect';

import * as GlobalReducer               from '../reducers/global-reducer';
import { DomainLoadAction }             from '../actions/base-domains-actions';
import { ResourceService, DomainEnum }  from '../resources/resource.service';
import { LogService }                   from '../../core/logging/log.service';
import { BaseRequest }                  from '../../core/models/request-response.models';
import { BaseStoreService }             from '../../core/state/store-services/base-store.service';
import { BaseDomains } from '../../models/domains/domains.models';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';

/**************************************************** */
// Wrapper service of the Domain State in the Store
/**************************************************** */
@Injectable()
export class DomainStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService) {
      super();
    }

  Domain$(domainEnum: DomainEnum): Observable<BaseDomains> {
    this.logService.log(this.getClassName() + ':Domain$');
    let getDomains = (globalState: GlobalReducer.GlobalState) => globalState.fullDomainState.domains[domainEnum].results;
    return this.store.select(getDomains)
      //.timeout(5000)
      .filter(p => p !== undefined);
  }

  /***********************************************************************************/
  /* Checks store if domains loaded and if not loaded, trigger effect to load via API
  ************************************************************************************/
  loadDomains(domainEnum: DomainEnum): void {
    let request = new BaseRequest();
    request.resource = this.resourceService.getDomainResource(domainEnum);
    let state: boolean;
    this.logService.log(this.getClassName() + ':start loadDomains');
    let getDomains = (globalState: GlobalReducer.GlobalState) => globalState.fullDomainState.domains[domainEnum].loaded;
    this.store.select(getDomains)
      .take(1)
      .subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isDomainsLoaded for ' + request.resource, state);
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch DomainLoadAction' + request.resource);
      this.store.dispatch(new DomainLoadAction(request, domainEnum));
    } else {
      this.logService.log(this.getClassName() + ':domains already loaded');
    }
  }
}
