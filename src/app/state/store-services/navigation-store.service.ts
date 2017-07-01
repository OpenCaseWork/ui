import { go, replace, search, show, back, forward, RouterState } from '@ngrx/router-store';
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
import { ResponseStatus } from '../../models/root.models';
import { RouteUrlConstituent } from '../../dashboard/dashboard-routing.urls';
import { ActivatedRoute } from '@angular/router';

// Wrapper service of the Account State in the Store
@Injectable()
export class NavigationStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private route: ActivatedRoute) {
      super();
    }

  openConstituent(id: number) {
    // issue: see https://github.com/ngrx/effects/issues/162
    this.store.dispatch(go([RouteUrlConstituent(), id ], { relativeTo: this.route }));
  }
}
