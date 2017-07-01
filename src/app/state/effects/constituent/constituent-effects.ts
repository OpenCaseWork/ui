import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LogService }              from '../../../core/logging/log.service';
import { ConstituentDataService } from './../../data-services/constituent/constituent-data.service';
import * as SearchActions from './../../actions/constituent/constituent-search-actions';
import * as AggregateActions from './../../actions/constituent/constituent-aggregate-actions';
import { BaseEffect } from '../base-effect';
import { ConstituentSearchRecord } from '../../../models/constituents/search/constituents-search.models';
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
      return (new SearchActions.SearchSuccessAction(res));
    } )
    .catch(err => {
      // TODO - Somehow exception is not caught here.
      // HttpService does observer.error(err) for error
      this.logService.error(this.getClassName() + ':load$ error ', err);
      return Observable.of(new SearchActions.SearchFailAction(err));
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
    private logService: LogService) {
      super();
  }
}
