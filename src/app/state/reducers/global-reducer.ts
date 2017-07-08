import { createSelector }             from 'reselect';
import { ActionReducer }              from '@ngrx/store';
import { compose }                    from '@ngrx/core/compose';
import { combineReducers }            from '@ngrx/store';
import { storeFreeze }                from 'ngrx-store-freeze';
import { RouterState, routerReducer } from '@ngrx/router-store';

import * as StatusReducer   from './status-reducer';
import * as ResourceReducer from './resource-reducer';
import * as DomainsReducer  from './domains/domains-reducer';
import * as SearchReducer   from './search-reducer';
import { environment }      from '../../../environments/environment';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface GlobalState {
  fullDomainState: DomainsReducer.FullDomainsState;
  statusState: StatusReducer.State;
  resourceState: ResourceReducer.ResourceState;
  searchState: SearchReducer.SearchState;
  // TODO add other States here
}

/* Names of reducers must match names of GlobalState above! */
const reducers = {
  fullDomainState: DomainsReducer.reducer,
  statusState: StatusReducer.reducer,
  resourceState: ResourceReducer.reducer,
  searchState: SearchReducer.reducer,
  // TODO add other reducers here
};

// During development, developmentReducer 'freezes' store to prevent side-effect from Reducers.
// Throws an exception if a Reducer mutates the State.
// Do not include storeFreeze middleware for production build.
const developmentReducer: ActionReducer<GlobalState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<GlobalState> = combineReducers(reducers);

// Note directly accessing environment.ts here. Any other way?
export function globalReducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
