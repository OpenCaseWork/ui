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
import { BaseStoreService } from './../../core/state/store-services/base-store.service';
import { RouteUrlConstituent } from '../../areas/dashboard/dashboard-routing.urls';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlDashboard } from '../../app-routing.urls';
import { ResourceService, ResourceEnum } from '../resources/resource.service';

// Wrapper service of the Account State in the Store
@Injectable()
export class NavigationStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService,
    private route: ActivatedRoute) {
      super();
    }

  // TODO: support openResource generically?
  openResource(id: number, resourceEnum: ResourceEnum) {
    let url = this.resourceService.getResourceUrls(resourceEnum);
    if (url) {
      this.store.dispatch(go([url, id ]));
    }
  }

  openConstituent(id: number) {
    // issue: see https://github.com/ngrx/effects/issues/162
    this.store.dispatch(go([RouteUrlDashboard() + '/' + RouteUrlConstituent(), id ]));
  }

  newConstituent() {
    // issue: see https://github.com/ngrx/effects/issues/162
    this.store.dispatch(go([RouteUrlDashboard() + '/' + RouteUrlConstituent()]));
  }
}
