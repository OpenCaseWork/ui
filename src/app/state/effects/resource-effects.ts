import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as ResourceActions          from '../actions/resource-actions';
import * as StatusActions             from '../actions/status-actions';
import * as GlobalReducer             from '../reducers/global-reducer';
import { BaseEffect }                 from './base-effect';
import { ResponseStatus, BaseEntity, BaseResponse } from '../../core/models/request-response.models';
import { LogService }                 from '../../core/logging/log.service';
import { BaseDataService }            from '../../core/state/data-services/base-data.service';
import { NavigationStoreService } from '../store-services/navigation-store.service';

@Injectable()
export class ResourceEffects extends BaseEffect {

  @Effect()
  get$: Observable<Action> = this.action$
    .ofType(ResourceActions.GET)
    .mergeMap(action => this.dataService.get(action.payload)
      .catch(err => {
        let errorResponse = new BaseResponse();
        this.logService.error(this.getClassName() + ':load$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.message = 'Error getting resource';
        status.stateIndex = action.payload.stateIndex;

        this.store.dispatch(new ResourceActions.GetFailAction(status));
        this.store.dispatch(new StatusActions.FailAction(status));
        errorResponse.responseInfo = status;
        errorResponse.responseInfo.stateIndex = action.payload.stateIndex;
        return Observable.of(errorResponse);
      })
      .map(res => {
        this.logService.log(this.getClassName() + ':get$ success', res);
        res.stateIndex = action.payload.stateIndex;
        res.responseInfo.stateIndex = action.payload.stateIndex;
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new ResourceActions.GetFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new ResourceActions.GetSuccessAction(res));
        }
      })
    );

  @Effect()
  save$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(ResourceActions.SAVE)
    .mergeMap(action => this.dataService.post(action.payload)
     .catch(err => {
        let errorResponse = new BaseResponse();
        this.logService.error(this.getClassName() + ':post$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.stateIndex = action.payload.stateIndex;
        status.message = 'Save failed';
        errorResponse.responseInfo = status;
        errorResponse.responseInfo.stateIndex = action.payload.stateIndex;
        this.store.dispatch(new ResourceActions.SaveFailAction(status));
        this.store.dispatch(new StatusActions.FailAction(status));
        return Observable.of(errorResponse);
      })
      .map(res => {
        this.logService.log(this.getClassName() + ':post$ success', res);
        res.stateIndex = action.payload.stateIndex;
        res.responseInfo.stateIndex = res.stateIndex;
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new ResourceActions.SaveFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          this.store.dispatch(new ResourceActions.SaveSuccessAction(res));
          if (res.responseInfo.message) {
            return (new StatusActions.SuccessAction(res.responseInfo));
          } else {
            let status = new ResponseStatus();
            status.message = action.payload.successMessage;
            status.stateIndex = action.payload.stateIndex;
            return (new StatusActions.SuccessAction(status));
          }
        }
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
