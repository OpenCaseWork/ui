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
import { BaseStoreService } from './base-store.service';
import { Actions } from '../actions/constituent/constituent-search-actions';
import { ResponseStatus, EntityRequest } from '../../models/root.models';
import { BaseRequest, BasePostRequest } from '../../models/base/base.models';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { IdleService } from '../../core/session/idle.service';

// Wrapper service of the Account State in the Store
@Injectable()
export class ConstituentStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
      super();
    }

  // Returns Observable to the Deposit Account of the Account State
  Constituent$(): Observable<ConstituentSearchRecord[]> {
    this.logService.log(this.getClassName() + ':Constituent$');
    return this.store.select(GlobalSelectors.constituentList);
  }

  Loaded$(): Observable<boolean> {
    this.logService.log(this.getClassName() + ':Loaded$');
    return this.store.select(GlobalSelectors.constituentListIsLoaded);
  }

  Loading$(): Observable<boolean> {
    this.logService.log(this.getClassName() + ':Loading$');
    return this.store.select(GlobalSelectors.constituentListIsLoading);
  }

  ResponseStatus$(): Observable<ResponseStatus> {
    this.logService.log(this.getClassName() + ':ResponseStatus$');
    return this.store.select(GlobalSelectors.constituentsResponseStatus);
  }


  SelectedConstituent$(): Observable<ConstituentSearchRecord[]> {
    return this.store.select(GlobalSelectors.constituentsSelected);
  }

  selectConstituents(selected: ConstituentSearchRecord[]): void {
    this.logService.log(this.getClassName() + ':selected:' + selected.length);
    this.store.dispatch(new ConstituentSearchActions.SelectAction(selected));
  }

  // Load Account using API if not already loaded into the Store
  searchConstituents(request: ConstituentSearchRequest): void {
    let payload = new BasePostRequest<ConstituentSearchRequest>();
    payload.resource = 'constituents';
    payload.data = request;
    let state: boolean;
    this.logService.log(this.getClassName() + ':start searchConstituents');
    // Synchronously check if Account is loaded
    // Emit only the first 1 value emmited by the source Observable
    //this.store.select(GlobalSelectors.constituentListIsLoaded)
    //  .take(1).subscribe(s => state = s);
    //this.logService.log(this.getClassName() + ':isLoaded for ' + request, state);
    // If Account is not loaded, load Account using API
    //if (!state) {
      //this.logService.log(this.getClassName() + ':dispatch Account.LoadAction');
      this.store.dispatch(new ConstituentSearchActions.SearchAction(payload));
    //} else {
    //  this.logService.log(this.getClassName() + ':already loaded');
    //}
  }

  Domain$(): Observable<ConstituentDomains> {
    this.logService.log(this.getClassName() + ':Domain$');
    return this.store.select(GlobalSelectors.constituentDomains);
  }


  // Load Account using API if not already loaded into the Store
  loadDomains(): void {
    let request = new BaseRequest();
    request.resource = 'constituents';
    let state: boolean;
    this.logService.log(this.getClassName() + ':start loadDomains');
    // Synchronously check if loaded
    // Emit only the first 1 value emmited by the source Observable
    this.store.select(GlobalSelectors.constituentDomainsIsLoaded)
      .take(1)
      .subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isDomainsLoaded for ' + request, state);
    // If Account is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch ConstituentDomainsActions.LoadAction');
      this.store.dispatch(new ConstituentDomainsActions.LoadAction(request));
    } else {
      this.logService.log(this.getClassName() + ':domains already loaded');
    }
  }

  // Returns Observable to the Deposit Account of the Account State
  ConstituentAggregate$(): Observable<ConstituentAggregate> {
    this.logService.log(this.getClassName() + ':ConstituentAggregate$');
    return this.store.select(GlobalSelectors.constituent);
  }

  // Load Account using API if not already loaded into the Store
  getConstituent(id: number): void {
    let state: ConstituentAggregate;
    if (Number.isNaN(id) || id <= 0) {
      this.logService.log(this.getClassName() + ':dispatch NewAction');
      this.store.dispatch(new ConstituentAggregateActions.NewAction(new ConstituentAggregate()));
      return;
    }
    let request = new EntityRequest();
    request.id = id;
    request.resource = 'constituent-aggregates';
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

  // Load Account using API if not already loaded into the Store
  saveConstituent(constituent: ConstituentAggregate): void {
    let request = new BasePostRequest<ConstituentAggregate>();
    request.data = constituent;
    request.resource = 'constituent-aggregates';
    this.logService.log(this.getClassName() + ':start saveConstituent:' + JSON.stringify(request.data));
    this.store.dispatch(new ConstituentAggregateActions.SaveAction(request));
  }

}
