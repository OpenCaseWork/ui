import { NgModule, Optional, SkipSelf }       from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { globalReducer  } from './reducers/global-reducer';
import { ConstituentEffect  } from './effects/constituent/constituent-effects';
import { ConstituentStoreService } from './store-services/constituent-store-service';
import { ErrorStoreService } from './store-services/error-store.service';
import { NavigationStoreService } from './store-services/navigation-store.service';
import { TransferStoreService } from './store-services/transfer-store.services';
import { BaseDataService } from './../core/state/data-services/base-data.service';
import { BaseDataServiceProvider } from './../core/state/data-services/data.provider';
import { ConstituentResourcesService } from './resources/constituent-resources.service';

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
    RouterStoreModule.connectRouter(),
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
    ConstituentResourcesService,
    //ConstituentDataService,
    BaseDataServiceProvider,
    TransferStoreService,
    NavigationStoreService,
    ErrorStoreService,
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
