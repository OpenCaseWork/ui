import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store }      from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as SearchActions from '../actions/search-actions';
import * as GlobalReducer from '../reducers/global-reducer';
import { BaseStoreService }                                       from './../../core/state/store-services/base-store.service';
import { BasePostRequest, EntityRequest, BaseEntity, BaseFilter } from '../../core/models/request-response.models';
import { ResourceService, SearchEnum }                            from '../resources/resource.service';

// Wrapper service of the State in the Store
@Injectable()
export class SearchStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService) {
      super();
    }

   Searche$(searchEnum: SearchEnum): Observable<any[]> {
    this.logService.log(this.getClassName() + ':Searche$:' + searchEnum);
    let getSearch = (globalState: GlobalReducer.GlobalState) => globalState.searchState.searches[searchEnum].results;
    return this.store.select(getSearch);
  }

  SearchLoaded$(searchEnum: SearchEnum): Observable<boolean> {
    this.logService.log(this.getClassName() + ':SearchLoaded$:' + searchEnum);
    let getSearch = (globalState: GlobalReducer.GlobalState) => globalState.searchState.searches[searchEnum].loaded;
    return this.store.select(getSearch);
  }

  SearchLoading$(searchEnum: SearchEnum): Observable<boolean> {
    this.logService.log(this.getClassName() + ':SearchLoading$:' + searchEnum);
    let getSearch = (globalState: GlobalReducer.GlobalState) => globalState.searchState.searches[searchEnum].loading;
    return this.store.select(getSearch);
  }

  search(request: BaseFilter, searchEnum: SearchEnum): void {
    let payload = new BasePostRequest();
    payload.resource = this.resourceService.getSearchResource(searchEnum);
    payload.data = request;
    payload.stateIndex = searchEnum;
    let state: boolean;
    this.logService.log(this.getClassName() + ':start search:' + searchEnum);
    this.store.dispatch(new SearchActions.SearchAction(payload));
  }

}
