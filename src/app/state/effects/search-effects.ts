import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as SearchActions             from '../actions/search-actions';
import * as StatusActions             from '../actions/status-actions';
import * as GlobalReducer             from '../reducers/global-reducer';
import { BaseEffect }                 from './base-effect';
import { ResponseStatus, BaseEntity } from '../../core/models/request-response.models';
import { LogService }                 from '../../core/logging/log.service';
import { BaseDataService }            from '../../core/state/data-services/base-data.service';

@Injectable()
export class SearchEffects extends BaseEffect {

  @Effect()
  search$: Observable<Action> = this.action$
    .ofType(SearchActions.SEARCH)
    .mergeMap(action => this.dataService.search<Array<BaseEntity>>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':search$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new SearchActions.SearchFailAction(res.responseInfo, action.index));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new SearchActions.SearchSuccessAction(res, action.index));
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':search$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        // TODO: allow config for message
        status.message = 'Error searching for resource';
        this.store.dispatch(new SearchActions.SearchFailAction(status, action.index));
        this.store.dispatch(new StatusActions.FailAction(status));
        return Observable.throw(err);
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
