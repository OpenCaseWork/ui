import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LogService }              from '../../../core/logging/log.service';
import { ConstituentDataService } from './../../data-services/constituent/constituent-data.service';
import * as SearchActions from './../../actions/constituent/constituent-search-actions';
import * as DomainActions from './../../actions/constituent/constituent-domains-actions';
import * as AggregateActions from './../../actions/constituent/constituent-aggregate-actions';
import * as ErrorActions from './../../actions/error/error-actions';
import { BaseEffect } from '../base-effect';
import { ConstituentSearchRecord } from '../../../models/constituents/search/constituents-search.models';
import { ResponseStatus } from '../../../models/root.models';
import * as GlobalReducer from '../../reducers/global-reducer';
import { SearchAction, SearchFailAction } from '../../actions/constituent/constituent-search-actions';
/**
 * Effects offer a way to isolate and easily test side-effects within your application
 */

@Injectable()
export class ConstituentEffect extends BaseEffect {

  @Effect()
  load$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(SearchActions.SEARCH)
    .switchMap(action => this.constituentDataService.search<ConstituentSearchRecord>(action.payload)
    .map(res => {
      this.logService.log(this.getClassName() + ':load$ success', res);
      if (res.responseInfo.statusCode !== 0) {
        return (new SearchActions.SearchFailAction(res.responseInfo));
      } else {
        return (new SearchActions.SearchSuccessAction(res));
      }
    } )
    .catch(err => {
      // TODO - Somehow exception is not caught here.
      // HttpService does observer.error(err) for error
      this.logService.error(this.getClassName() + ':load$ error ', err);
      let status = new ResponseStatus();
      status.statusCode = 500;
      status.errorEnumId = 1;
      status.message = 'Error searching for constituents';
      this.store.dispatch(new SearchActions.SearchFailAction(status));
      return Observable.of(new ErrorActions.FailAction(status));
    } )
  );

@Effect()
  domain$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(DomainActions.LOAD)
    .switchMap(action => this.constituentDataService.loadDomains(action.payload)
    .map(res => {
      this.logService.log(this.getClassName() + ':domain$ success', res);
      if (res.responseInfo.statusCode !== 0) {
        return (new DomainActions.LoadFailAction(res.responseInfo));
      } else {
        return (new DomainActions.LoadSuccessAction(res));
      }
    } )
    .catch(err => {
      this.logService.error(this.getClassName() + ':domain$ error ', err);
      let status = new ResponseStatus();
      status.statusCode = 500;
      status.errorEnumId = 1;
      status.message = 'Load Domains failed';
      return Observable.of(new ErrorActions.FailAction(status));
    } )
  );


/*
  save$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(AggregateActions.SAVE)
    .switchMap(action => this.constituentDataService.s<ConstituentSearchRecord>(action.payload)
    .map(res => {
      this.logService.log(this.getClassName() + ':load$ success', res);
      return (new AggregateActions.SaveSuccessAction(res));
    } )
    .catch(err => {
      // TODO - Somehow exception is not caught here.
      // HttpService does observer.error(err) for error
      this.logService.error(this.getClassName() + ':load$ error ', err);
      return Observable.of(new AggregateActions.SearchFailAction(err));
    } )
  );*/

  constructor(
    private action$: Actions,
    private constituentDataService: ConstituentDataService,
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
      super();
  }
}
