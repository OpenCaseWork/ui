import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { RouterState, routerReducer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';

// Combine States and Reducers.
// Define selectors for individual State Properties

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as ConstituentSearchReducer from './constituent/constituent-search-reducer';
import * as ConstituentAggregateReducer from './constituent/constituent-aggregate-reducer';
import * as StatusReducer  from './status-reducer';
import * as ResourceReducer from './resource-reducer';
import * as DomainsReducer from './domains/domains-reducer';
import * as SearchReducer from './search-reducer';
// TODO add other reducers

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface GlobalState {
  constituentSearchState: ConstituentSearchReducer.State;
  constituentAggregateState: ConstituentAggregateReducer.State;
  fullDomainState: DomainsReducer.FullDomainsState;
  statusState: StatusReducer.State;
  resourceState: ResourceReducer.ResourceState;
  searchState: SearchReducer.SearchState;
  // TODO add other States here
}

/* Names of reducers must match names of GlobalState above! */
const reducers = {
  constituentSearchState: ConstituentSearchReducer.reducer,
  constituentAggregateState: ConstituentAggregateReducer.reducer,
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
