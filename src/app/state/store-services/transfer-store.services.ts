import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';

// RxJS powered state management for Angular applications, inspired by Redux
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// Import entire contents of /reducers/index.ts into the scope,
// containing all the exported bindings from the module ideitified by "FromStore"
// TODO - decide on naming convention
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

  Loaded$(): Observable<boolean> {
    this.logService.log(this.getClassName() + ':FromAccount$');
    return this.store.select(GlobalSelectors.transferFromAccountLoaded);
  }
 

/*
  // Returns Observable to the Deposit Account of the Account State
  PendingTransfers$(): Observable<PendingTransferInfo[]> {
    this.logService.log('AccountStore DepositAccount$');
    return this.store.select(FromStore.depositAccounts);
  }

  SelectedTransfer$(): Observable<PendingTransferRequest> {
    return this.store.select(FromStore.selectedTransfer);
  }

  selectTransfer(selectedTransfer: PendingTransferRequest): void {
    this.logService.log('selectedShare:' + selectedShare.id);
    this.store.dispatch(new Account.SelectAction(selectedShare));
  }

  // Load Transfer History if not already loaded into the Store
  loadTransferHistory(request: AchPaymentHistRequest): void {
    let state: boolean;
    this.logService.log('account-store-service start loadAccount');
    // Synchronously check if Account is loaded
    // Emit only the first 1 value emmited by the source Observable
    this.store.select(FromStore.isAccountLoaded)
      .take(1).subscribe(s => state = s);
    this.logService.log('isAccountLoaded for ' + id, state);
    // If Account is not loaded, load Account using API
    if (!state) {
      this.logService.log('dispatch Account.LoadAction');
      this.store.dispatch(new Account.LoadAction(id));
    } else {
      this.logService.log('state found');
    }
  }

    loadPendingTransfers(): void {
    let state: boolean;
    this.logService.log('account-store-service start loadAccount');
    // Synchronously check if Account is loaded
    // Emit only the first 1 value emmited by the source Observable
    this.store.select(FromStore.isAccountLoaded)
      .take(1).subscribe(s => state = s);
    this.logService.log('isAccountLoaded for ' + id, state);
    // If Account is not loaded, load Account using API
    if (!state) {
      this.logService.log('dispatch Account.LoadAction');
      this.store.dispatch(new Account.LoadAction(id));
    } else {
      this.logService.log('state found');
    }
  }

  // Unload Account, basically just invalidating the currently loaded Account
  unloadAccount(id: string): void {
    this.logService.log('dispatch Account.UnloadAction');
    this.store.dispatch(new Account.UnloadAction(id));
  }*/
}
