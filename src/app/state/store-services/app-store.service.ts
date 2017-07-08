import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as GlobalReducer from '../reducers/global-reducer';
import * as AppActions from './../actions/app-actions';
import { BaseStoreService } from './../../core/state/store-services/base-store.service';
import { EntityRequest, BaseEntity } from '../../core/models/request-response.models';
import { ResourceService, AppStateEnum } from '../resources/resource.service';

// Wrapper service of the State in the Store
@Injectable()
export class AppStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService) {
      super();
    }

   AppState$(appStateEnum: AppStateEnum): Observable<BaseEntity> {
    this.logService.log(this.getClassName() + ':AppState$');
    let getState = (globalState: GlobalReducer.GlobalState) => globalState.appState.resources[appStateEnum].results;
    return this.store.select(getState)
      .filter(p => p !== undefined);
  }

  setState(state: BaseEntity, appStateEnum: AppStateEnum): void {
    this.logService.log(this.getClassName() + ':start setState:', state);
    this.store.dispatch(new AppActions.SetAction(state, appStateEnum));
  }

  newState(appStateEnum: AppStateEnum): void {
    let state: BaseEntity;
    this.logService.log(this.getClassName() + ':dispatch NewAction');
    this.store.dispatch(new AppActions.NewAction(this.resourceService.getNewState(appStateEnum), appStateEnum));
  }

}
