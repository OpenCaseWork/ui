import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as GlobalReducer from '../reducers/global-reducer';
import * as GlobalSelectors from '../reducers/global-selectors';
import * as AccountAction from './../actions/transfer-accounts-action';


@Injectable()
export class TransferStoreService  {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>) { }

  getClassName(): string {
    return (<any>this).constructor.name;
  }

}
