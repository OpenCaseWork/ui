import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as DomainActions             from '../../actions/base-domains-actions';
import * as StatusActions              from '../../actions/status-actions';
import * as GlobalReducer             from '../../reducers/global-reducer';
import { BaseEffect }                 from '../base-effect';
import { ResponseStatus }             from '../../../core/models/request-response.models';
import { LogService }                 from '../../../core/logging/log.service';
import { BaseDataService }            from '../../../core/state/data-services/base-data.service';
import { BaseDomains }                from '../../../models/domains/domains.models';


@Injectable()
export class DomainEffects extends BaseEffect {

  @Effect()
  domain$: Observable<Action> = this.action$
    // Filter actions by action type
    .ofType(DomainActions.LOAD)
    .mergeMap(action => this.dataService.loadDomains<BaseDomains>(action.payload)
      .map(res => {
        this.logService.log(this.getClassName() + ':domain$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          return (new DomainActions.DomainLoadFailAction(res.responseInfo, action.index));
        } else {
          return (new DomainActions.DomainLoadSuccessAction(res, action.index));
        }
      })
      .catch(err => {
        this.logService.error(this.getClassName() + ':domain$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.message = 'Load Domains failed';
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
