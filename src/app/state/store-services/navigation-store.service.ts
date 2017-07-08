import { Injectable }       from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { go, RouterState }  from '@ngrx/router-store';
import { Store }            from '@ngrx/store';

import * as GlobalReducer                 from '../reducers/global-reducer';
import { LogService }                     from './../../core/logging/log.service';
import { BaseStoreService }               from './../../core/state/store-services/base-store.service';
import { RouteUrlConstituent }            from '../../areas/dashboard/dashboard-routing.urls';
import { RouteUrlDashboard }              from '../../app-routing.urls';
import { ResourceService, ResourceEnum }  from '../resources/resource.service';
import { Observable } from 'rxjs/Rx';

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

  newConstituent(): Observable<boolean> {
    // issue: see https://github.com/ngrx/effects/issues/162
    this.store.dispatch(go([RouteUrlDashboard() + '/' + RouteUrlConstituent()]));
    return Observable.of(true);
  }
}
