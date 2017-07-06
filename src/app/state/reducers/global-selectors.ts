import { createSelector } from 'reselect';
import * as ConstituentSearchReducer from './constituent/constituent-search-reducer';
import * as ConstituentDomainsReducer from './constituent/constituent-domains-reducer';
import * as ConstituentAggregateReducer from './constituent/constituent-aggregate-reducer';
import * as StatusReducer from './status-reducer';
import * as TransferAccounts from './transfer-accounts-reducer';
import { GlobalState } from './global-reducer';
import { isLoaded } from './constituent/constituent-search-reducer';

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
// Define selectors for the States in the Store.
export const getConstituentSearchState = (state: GlobalState) => state.constituentSearchState;
//export const getConstituentDomainsState = (state: GlobalState) => state.constituentDomainsState;
export const getConstituentState = (state: GlobalState) => state.constituentAggregateState;
export const getStatusState = (state: GlobalState) => state.statusState;
//export const getTransferAccountState = (state: GlobalState) => state.transferAccounts;
export const domainsState = (state: GlobalState) => state.fullDomainState;
// TODO add other state selectors here

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */

// Define selectors for the individual property of State for convenience
export const constituentListIsLoaded = createSelector(getConstituentSearchState, ConstituentSearchReducer.isLoaded);
export const constituentListIsLoading = createSelector(getConstituentSearchState, ConstituentSearchReducer.isLoading);
export const constituentList = createSelector(getConstituentSearchState, ConstituentSearchReducer.results);
export const constituentsSelected = createSelector(getConstituentSearchState, ConstituentSearchReducer.selected);
export const constituentsResponseStatus = createSelector(getConstituentSearchState, ConstituentSearchReducer.responseStatus);

//export const constituentDomainsIsLoaded = createSelector(getConstituentDomainsState, ConstituentDomainsReducer.isLoaded);
//export const constituentDomainsIsLoading = createSelector(getConstituentDomainsState, ConstituentDomainsReducer.isLoading);
//export const constituentDomains = createSelector(getConstituentDomainsState, ConstituentDomainsReducer.results);
//export const constituentsDomainsResponseStatus = createSelector(getConstituentDomainsState, ConstituentDomainsReducer.responseStatus);

export const constituentIsLoading = createSelector(getConstituentState, ConstituentAggregateReducer.isLoading);
export const constituent = createSelector(getConstituentState, ConstituentAggregateReducer.results);

export const currentStatus = createSelector(getStatusState, StatusReducer.responseStatus);

//export const transferFromAccountLoading = createSelector(getTransferAccountState, TransferAccounts.fromLoading);
//export const transferFromAccountLoaded = createSelector(getTransferAccountState, TransferAccounts.fromLoaded);

export const getDomains = (state: GlobalState) => state.fullDomainState.domains[0];

 // TODO add other selectors for properties of state
/*export const selectors = createSelectors();

function createSelectors() {
    console.log('create selectors');
     let isLoaded = (state: DomainsState) => state.loaded;
      let isLoading = (state: DomainsState) => state.loading;
      let results = (state: DomainsState ) => state.results;
      let responseStatus = (state: DomainsState ) => state.responseStatus;

      let getDomainsState = (state: GlobalState) => state.fullDomainState.domains1;
      this.isLoadedSelector = createSelector(getDomainsState, isLoaded);
      this.resultsSelector = createSelector(getDomainsState, results);
}*/