import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ErrorActions from '../actions/error/error-actions';
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import { BaseStoreService } from './base-store.service';
import { ResponseStatus } from '../../core/models/request-response.models';
import { LogService } from './../../core/logging/log.service';


// Wrapper service of the Account State in the Store
@Injectable()
export class ErrorStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) {
      super();
    }

  Error$(): Observable<ResponseStatus> {
    this.logService.log(this.getClassName() + ':ResponseStatus$');
    return this.store.select(GlobalSelectors.errorResponseStatus);
  }

  publishError(message: string) {
    let error = new ResponseStatus();
    error.message = message;
    error.errorEnumId = 1;
    this.store.dispatch(new ErrorActions.FailAction(error));
  }
}
