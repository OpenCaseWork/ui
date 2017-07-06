import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import * as ConstituentSearchActions from './../actions/constituent/constituent-search-actions';
import * as ConstituentDomainsActions from './../actions/constituent/constituent-domains-actions';
import * as ConstituentAggregateActions from './../actions/constituent/constituent-aggregate-actions';
import { ConstituentSearchRecord, ConstituentSearchRequest } from '../../models/constituents/search/constituents-search.models';
import { BaseStoreService } from './../../core/state/store-services/base-store.service';
import { BaseRequest, BasePostRequest, ResponseStatus, EntityRequest } from '../../core/models/request-response.models';
import { ResourceService, DomainEnum } from '../resources/resource.service';
import { DomainActions, DomainLoadAction, BaseDomainActions } from '../actions/base-domains-actions';
import { BaseDomains } from '../../models/domains/domains.models';
import { GlobalState } from '../reducers/global-reducer';

// Wrapper service of the State in the Store
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
    let getDomains = (globalState: GlobalState) => globalState.fullDomainState.domains[domainEnum].results;
    return this.store.select(getDomains);
  }

  // Load using API if not already loaded into the Store
  loadDomains(domainEnum: DomainEnum): void {
    let request = new BaseRequest();
    request.resource = this.resourceService.getDomainResource(domainEnum);
    let state: boolean;
    this.logService.log(this.getClassName() + ':start loadDomains');
    let getDomains = (globalState: GlobalState) => globalState.fullDomainState.domains[domainEnum].loaded;
    this.store.select(getDomains)
    // this.store.select(constituentDomains)
      .take(1)
      .subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isDomainsLoaded for ' + request.resource, state);
    // If is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch DomainLoadAction' + request.resource);
      this.store.dispatch(new DomainLoadAction(request, domainEnum));
    } else {
      this.logService.log(this.getClassName() + ':domains already loaded');
    }
  }
}
