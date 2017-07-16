import { Injectable }                 from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store }              from '@ngrx/store';
import { Observable }                 from 'rxjs/Observable';

import * as DomainActions             from '../../actions/base-domains-actions';
import * as StatusActions              from '../../actions/status-actions';
import * as GlobalReducer             from '../../reducers/global-reducer';
import { BaseEffect }                 from '../base-effect';
import { ResponseStatus, BaseResponse }             from '../../../core/models/request-response.models';
import { LogService }                 from '../../../core/logging/log.service';
import { BaseDataService }            from '../../../core/state/data-services/base-data.service';
import { BaseDomains } from '../../../models/domains/domains.models';

@Injectable()
export class DomainEffects extends BaseEffect {

  @Effect()
  domain$: Observable<Action> = this.action$
    .ofType(DomainActions.LOAD)
    .mergeMap(action => this.dataService.loadDomains(action.payload)
      .catch(err => {
        let errorResponse = new BaseResponse();
        this.logService.error(this.getClassName() + ':domain$ error ', err);
        let status = new ResponseStatus();
        status.statusCode = 500;
        status.errorEnumId = 1;
        status.message = 'Load Domains failed';
        errorResponse.responseInfo = status;
        errorResponse.stateIndex = action.payload.stateIndex;
        return Observable.of(errorResponse);
      })
      .map(res => {
        this.logService.log(this.getClassName() + ':domain$ success', res);
        if (res.responseInfo.statusCode !== 0) {
          res.stateIndex = action.payload.stateIndex;
          res.responseInfo.stateIndex = action.payload.stateIndex;
          this.store.dispatch(new StatusActions.FailAction(res.responseInfo));
          return (new DomainActions.DomainLoadFailAction(res.responseInfo));
        } else {
          return (new DomainActions.DomainLoadSuccessAction(res));
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
