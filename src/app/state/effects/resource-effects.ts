import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as ResourceActions          from '../actions/resource-actions';
import * as StatusActions             from '../actions/status-actions';
import * as GlobalReducer             from '../reducers/global-reducer';
import { BaseEffect }                 from './base-effect';
import { ResponseStatus, BaseEntity } from '../../core/models/request-response.models';
import { LogService }                 from '../../core/logging/log.service';
import { BaseDataService }            from '../../core/state/data-services/base-data.service';
import { NavigationStoreService } from '../store-services/navigation-store.service';

@Injectable()
export class ResourceEffects extends BaseEffect {

  @Effect()
  get$: Observable<Action> = this.action$
    .ofType(ResourceActions.GET)
    .mergeMap(action => this.dataService.get<BaseEntity>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':get$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new ResourceActions.GetFailAction(res.responseInfo, action.index));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new ResourceActions.GetSuccessAction(res, action.index));
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':load$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        // TODO: allow config of message
        status.message = 'Error getting resource';
        this.store.dispatch(new ResourceActions.GetFailAction(status, action.index));
        this.store.dispatch(new StatusActions.FailAction(status));
        return Observable.throw(err);
      })
    );

  @Effect()
  save$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(ResourceActions.SAVE)
    .mergeMap(action => this.dataService.post<BaseEntity>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':post$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new ResourceActions.SaveFailAction(res.responseInfo, action.index));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          this.store.dispatch(new ResourceActions.SaveSuccessAction(res, action.index));
          if (res.responseInfo.message) {
            return (new StatusActions.SuccessAction(res.responseInfo));
          } else {
            let status = new ResponseStatus();
            status.message = action.payload.successMessage;
            return (new StatusActions.SuccessAction(status));
          }
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':post$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        //TODO: config message
        status.message = 'Save failed';
        this.store.dispatch(new ResourceActions.SaveFailAction(status, action.index));
        this.store.dispatch(new StatusActions.FailAction(status));
        return Observable.throw(err);
      })
    );


  constructor(
    private action$: Actions,
    private dataService: BaseDataService,
    private logService: LogService,
    private navService: NavigationStoreService,
    private store: Store<GlobalReducer.GlobalState>) {
    super();
  }
}
