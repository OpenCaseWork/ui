import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';

// RxJS powered state management for Angular applications, inspired by Redux
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// Import entire contents of /reducers/index.ts into the scope,
// containing all the exported bindings from the module ideitified by "FromStore"
// TODO - decide on naming convention
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import * as ConstituentSearchActions from './../actions/constituent/constituent-search-actions';
import { ConstituentSearchRecord, ConstituentSearchRequest } from '../../models/constituents/search/constituents-search.models';
import { BaseStoreService } from './base-store.service';
import { Actions } from '../actions/constituent/constituent-search-actions';

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

  SelectedConstituent$(): Observable<ConstituentSearchRecord[]> {
    return this.store.select(GlobalSelectors.constituentsSelected);
  }

  selectConstituents(selected: ConstituentSearchRecord[]): void {
    this.logService.log(this.getClassName() + ':selected:' + selected.length);
    this.store.dispatch(new ConstituentSearchActions.SelectAction(selected));
  }

  // Load Account using API if not already loaded into the Store
  searchConstituents(request: ConstituentSearchRequest): void {
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
      this.store.dispatch(new ConstituentSearchActions.SearchAction(request));
    //} else {
    //  this.logService.log(this.getClassName() + ':already loaded');
    //}
  }

}
