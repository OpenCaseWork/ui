import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as SearchActions             from '../../actions/constituent/constituent-search-actions';
import * as AggregateActions          from '../../actions/constituent/constituent-aggregate-actions';
import * as StatusActions              from '../../actions/status-actions';
import * as GlobalReducer             from '../../reducers/global-reducer';
import { BaseEffect }                 from '../base-effect';
import { NavigationStoreService }     from '../../store-services/navigation-store.service';
import { ResponseStatus }             from '../../../core/models/request-response.models';
import { LogService }                 from '../../../core/logging/log.service';
import { BaseDataService }            from '../../../core/state/data-services/base-data.service';
import { ConstituentAggregate }       from '../../../models/constituents/constituents-aggregates.models';
import { ConstituentDomains }         from '../../../models/constituents/domains/constituents-domains.models';
import { ConstituentSearchRecord }    from '../../../models/constituents/search/constituents-search.models';

@Injectable()
export class ConstituentEffect extends BaseEffect {

  @Effect()
  get$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(AggregateActions.GET)
    .switchMap(action => this.constituentDataService.get<ConstituentAggregate>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':get$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new AggregateActions.GetFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new AggregateActions.GetSuccessAction(res));
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':load$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.message = 'Error getting for constituent';
        this.store.dispatch(new AggregateActions.GetFailAction(status));
        return Observable.of(new StatusActions.FailAction(status));
      })
    );

  @Effect()
  load$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(SearchActions.SEARCH)
    .switchMap(action => this.constituentDataService.search<Array<ConstituentSearchRecord>>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':load$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new SearchActions.SearchFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          return (new SearchActions.SearchSuccessAction(res));
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':load$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.message = 'Error searching for constituents';
        this.store.dispatch(new SearchActions.SearchFailAction(status));
        return Observable.of(new StatusActions.FailAction(status));
      })
    );

  @Effect()
  save$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(AggregateActions.SAVE)
    .switchMap(action => this.constituentDataService.post<ConstituentAggregate>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':post$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          this.store.dispatch(new AggregateActions.SaveFailAction(res.responseInfo));
          return (new StatusActions.FailAction(res.responseInfo));
        } else {
          this.navService.openConstituent(res.data.constituent.constituentId);
          this.store.dispatch(new AggregateActions.SaveSuccessAction(res));
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
        status.message = 'Save failed';
        this.store.dispatch(new AggregateActions.SaveFailAction(status));
        return Observable.of(new StatusActions.FailAction(status));
      })
    );

  constructor(
    private action$: Actions,
    private constituentDataService: BaseDataService,
    private navService: NavigationStoreService,
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
    super();
  }
}
