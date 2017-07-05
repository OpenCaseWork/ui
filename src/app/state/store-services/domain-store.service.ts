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
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { ConstituentResourcesService } from '../resources/constituent-resources.service';
import { DomainActions, DomainLoadAction, BaseDomainActions } from '../actions/base-domains-actions';
import { BaseDomains } from '../../models/domains/domains.models';
import { GlobalState } from '../reducers/global-reducer';
import { constituentDomains } from '../reducers/global-selectors';

// Wrapper service of the State in the Store
@Injectable()
export class DomainStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ConstituentResourcesService) {
      super();
    }

  Domain$(index): Observable<BaseDomains> {
    this.logService.log(this.getClassName() + ':Domain$');
    let getDomains = (globalState: GlobalState) => globalState.fullDomainState.domains[index].results;
    return this.store.select(getDomains);
  }


  // Load using API if not already loaded into the Store
  loadDomains(index: number): void {
    let request = new BaseRequest();
    request.resource = this.resourceService.getResources().domains;
    let state: boolean;
    this.logService.log(this.getClassName() + ':start loadDomains');
    let getDomains = (globalState: GlobalState) => globalState.fullDomainState.domains[index].loaded;
    this.store.select(getDomains)
    // this.store.select(constituentDomains)
      .take(1)
      .subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isDomainsLoaded for ' + request, state);
    // If is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch ConstituentDomainsActions.LoadAction');
      this.store.dispatch(new DomainLoadAction(request, index));
    } else {
      this.logService.log(this.getClassName() + ':domains already loaded');
    }
  }
}
