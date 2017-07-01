import { createSelector } from 'reselect';
import * as SearchActions from '../../actions/constituent/constituent-search-actions';
import { ConstituentSearchRecord } from '../../../models/constituents/search/constituents-search.models';
import { BaseResponse, ResponseStatus } from '../../../models/root.models';

export interface State {
  results: Array<ConstituentSearchRecord>;
  selected: Array<ConstituentSearchRecord>;
  loading: boolean;
  loaded: boolean;
  responseStatus: ResponseStatus;
};

export const initialState: State = {
  results: undefined,
  selected: undefined,
  loading: false,
  loaded: false,
  responseStatus: undefined
};

// Define Account State Selector for convenience
export const isLoaded = (state: State) => state.loaded;
export const isLoading = (state: State) => state.loading;
export const results = (state: State ) => state.results;
export const selected = (state: State ) => state.selected;
export const responseStatus = (state: State ) => state.responseStatus;

// Reducer responses to Action and handles state change
export function reducer(state = initialState, action: SearchActions.Actions): State {
  switch (action.type) {
      case SearchActions.SEARCH: {
      const newState: State = Object.assign({}, state, {
        loading: true
      });
      return newState;
    }
    case SearchActions.SEARCH_SUCCESS: {
      const newState: State =  {
        results: action.payload.data,
        selected: undefined,
        loading: false,
        loaded: true,
        responseStatus: action.payload.responseInfo
      };
      return newState;
    }
    case SearchActions.SEARCH_FAILURE: {
      const newState: State = {
        results: undefined,
        selected: undefined,
        loading: false,
        loaded: false,
        responseStatus: action.payload
      };
      return newState;
    }
    case SearchActions.SELECTED: {
       const newState = Object.assign({}, state, {
        selected: action.payload
      });
      return newState;
    }
    default: {
      // console.log('Account reducer default action returning', state);
      return state;
    }
  }
}

