import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as SearchActions             from '../actions/search-actions';
import * as StatusActions             from '../actions/status-actions';
import * as GlobalReducer             from '../reducers/global-reducer';
import { BaseEffect }                 from './base-effect';
import { ResponseStatus, BaseEntity, BaseResponse } from '../../core/models/request-response.models';
import { LogService }                 from '../../core/logging/log.service';
import { BaseDataService }            from '../../core/state/data-services/base-data.service';

@Injectable()
export class SearchEffects extends BaseEffect {

  @Effect()
  search$: Observable<Action> = this.action$
    .ofType(SearchActions.SEARCH)
    .mergeMap(action => this.dataService.search(action.payload)
      .catch(err => {
        let errorResponse = new BaseResponse();
        this.logService.error(this.getClassName() + ':search$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.stateIndex = action.payload.stateIndex;
        // TODO: allow config for message
        status.message = 'Error searching for resource';
        this.store.dispatch(new SearchActions.SearchFailAction(status));
        this.store.dispatch(new StatusActions.FailAction(status));
        errorResponse.responseInfo = status;
        errorResponse.stateIndex = action.payload.stateIndex;
        return Observable.of(errorResponse);
      })
      .map(res => {
        this.logService.log(this.getClassName() + ':search$ success', res);
        res.stateIndex = action.payload.stateIndex;
        res.responseInfo.stateIndex = action.payload.stateIndex;
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new SearchActions.SearchFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new SearchActions.SearchSuccessAction(res));
        }
      })
    );



  constructor(
    private action$: Actions,
    private dataService: BaseDataService,
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
    super();
  }
}
