import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import { BaseStoreService } from './base-store.service';
import { ResponseStatus } from '../../models/root.models';

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
}
