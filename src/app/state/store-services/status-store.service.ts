import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as StatusActions from     '../actions/status-actions';
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import { BaseStoreService } from './../../core/state/store-services/base-store.service';
import { ResponseStatus } from '../../core/models/request-response.models';
import { LogService } from './../../core/logging/log.service';


// Wrapper service of the Account State in the Store
@Injectable()
export class StatusStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
      super();
    }

  Status$(): Observable<ResponseStatus> {
    this.logService.log(this.getClassName() + ':Status$');
    return this.store.select(GlobalSelectors.currentStatus);
  }

  publishMessage(message: string) {
    let displayMessage = new ResponseStatus();
    displayMessage.message = message;
    displayMessage.errorEnumId = 0;
    this.store.dispatch(new StatusActions.SuccessAction(displayMessage));
  }

  publishError(message: string) {
    let error = new ResponseStatus();
    error.message = message;
    error.errorEnumId = 1;
    this.store.dispatch(new StatusActions.FailAction(error));
  }
}
