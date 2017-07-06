import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
import { ResourceService } from '../resources/resource.service';

// Wrapper service of the State in the Store
@Injectable()
export class ConstituentStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService) {
      super();
    }

   SearchConstituent$(): Observable<ConstituentSearchRecord[]> {
    this.logService.log(this.getClassName() + ':SearchConstituent$');
    return this.store.select(GlobalSelectors.constituentList);
  }

  SearchLoaded$(): Observable<boolean> {
    this.logService.log(this.getClassName() + ':SearchLoaded$');
    return this.store.select(GlobalSelectors.constituentListIsLoaded);
  }

  SearchLoading$(): Observable<boolean> {
    this.logService.log(this.getClassName() + ':SearchLoading$');
    return this.store.select(GlobalSelectors.constituentListIsLoading);
  }

  Domain$(): Observable<ConstituentDomains> {
    this.logService.log(this.getClassName() + ':Domain$');
    return this.store.select(GlobalSelectors.constituentDomains);
  }

  ConstituentAggregate$(): Observable<ConstituentAggregate> {
    this.logService.log(this.getClassName() + ':ConstituentAggregate$');
    return this.store.select(GlobalSelectors.constituent);
  }

  /*selectConstituents(selected: ConstituentSearchRecord[]): void {
    this.logService.log(this.getClassName() + ':selected:' + selected.length);
    this.store.dispatch(new ConstituentSearchActions.SelectAction(selected));
  }*/

  searchConstituents(request: ConstituentSearchRequest): void {
    let payload = new BasePostRequest<ConstituentSearchRequest>();
    payload.resource = this.resourceService.getResources().search;
    payload.data = request;
    let state: boolean;
    this.logService.log(this.getClassName() + ':start searchConstituents');
    this.store.dispatch(new ConstituentSearchActions.SearchAction(payload));
  }

  // Load using API if not already loaded into the Store
  loadDomains(): void {
    let request = new BaseRequest();
    request.resource = this.resourceService.getResources().domains;
    let state: boolean;
    this.logService.log(this.getClassName() + ':start loadDomains');
    this.store.select(GlobalSelectors.constituentDomainsIsLoaded)
      .take(1)
      .subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isDomainsLoaded for ' + request, state);
    // If is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch ConstituentDomainsActions.LoadAction');
      this.store.dispatch(new ConstituentDomainsActions.LoadAction(request));
    } else {
      this.logService.log(this.getClassName() + ':domains already loaded');
    }
  }

  // Load using API if not already loaded into the Store
  getConstituent(id: number): void {
    let state: ConstituentAggregate;
    if (Number.isNaN(id) || id <= 0) {
      this.logService.log(this.getClassName() + ':dispatch NewAction');
      this.store.dispatch(new ConstituentAggregateActions.NewAction(new ConstituentAggregate()));
      return;
    }
    let request = new EntityRequest();
    request.id = id;
    request.resource = this.resourceService.getResources().entity;
    this.logService.log(this.getClassName() + ':start getConstituent:id:' + request.id);
    // Synchronously check if loaded
    // Emit only the first 1 value emmited by the source Observable
    /*this.store.select(GlobalSelectors.constituent)
      .filter(agg => agg.constituent.constituentId === request.id)
      .take(1).subscribe(s => state = s);
    */
    this.logService.log(this.getClassName() + ':isLoaded for ' + request, state);
    // If Account is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch GetAction');
      this.store.dispatch(new ConstituentAggregateActions.GetAction(request));
    } else {
      this.logService.log(this.getClassName() + ':already loaded');
    }
  }

  saveConstituent(constituent: ConstituentAggregate): void {
    let request = new BasePostRequest<ConstituentAggregate>();
    request.data = constituent;
    request.resource = this.resourceService.getResources().entity;
    this.logService.log(this.getClassName() + ':start saveConstituent:' + JSON.stringify(request.data));
    this.store.dispatch(new ConstituentAggregateActions.SaveAction(request));
  }

}
