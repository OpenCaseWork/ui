import { NgModule, Optional, SkipSelf }       from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { globalReducer  } from './reducers/global-reducer';
import { ConstituentEffect  } from './effects/constituent/constituent-effects';
import { ConstituentStoreService } from './store-services/constituent-store-service';
import { TransferStoreService } from './store-services/transfer-store.services';
import { ConstituentDataService } from './data-services/constituent/constituent-data.service';

/*
import { AccountStoreService } from './store-services/account-store.service';
import { PayeeStoreService } from './store-services/payee-store.service';
import { BillPayStoreService } from './store-services/bill-pay-store.service';
import { TransferDataServiceProvider } from './data-services/data.provider';
import { TransferStoreService } from './store-services/transfer-store.service';
import { TransferEffect } from './effects/transfer-effect';
import { ConstituentStoreService } from './store-services/constituent-store-service';
import { ViewAccountServiceProvider,
          BillPayDataServiceProvider,
          PayeeDataServiceProvider } from './data-services/data.provider';
*/

@NgModule({
  imports: [
        // TODO Better place to setup store and effect classes?
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(globalReducer),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(ConstituentEffect),
    // TODO add other effect classes
  ],
  declarations: [
  ],
  providers: [
    ConstituentStoreService,
    ConstituentDataService,
    TransferStoreService
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class StateModule {
  constructor (@Optional() @SkipSelf() parentModule: StateModule) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only');
    }
  }
}
