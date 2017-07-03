import { createSelector } from 'reselect';
import * as DomainActions from '../../actions/constituent/constituent-domains-actions';
import { ResponseStatus } from '../../../models/root.models';
import { ConstituentDomains } from '../../../models/constituents/domains/constituents-domains.models';

export interface State {
  results: ConstituentDomains;
  loading: boolean;
  loaded: boolean;
  responseStatus: ResponseStatus;
};

export const initialState: State = {
  results: undefined,
  loading: false,
  loaded: false,
  responseStatus: undefined
};

// Define State Selector for convenience
export const isLoaded = (state: State) => state.loaded;
export const isLoading = (state: State) => state.loading;
export const results = (state: State ) => state.results;
export const responseStatus = (state: State ) => state.responseStatus;

// Reducer responses to Action and handles state change
export function reducer(state = initialState, action: DomainActions.Actions): State {
  console.log('domains reducer:' + action.type);
  switch (action.type) {
      case DomainActions.LOAD: {
      const newState: State = Object.assign({}, state, {
        loading: true
      });
      return newState;
    }
    case DomainActions.LOAD_SUCCESS: {
      const newState: State =  {
        results: action.payload.data,
        loading: false,
        loaded: true,
        responseStatus: action.payload.responseInfo
      };
      return newState;
    }
    case DomainActions.LOAD_FAILURE: {
      const newState: State = {
        results: undefined,
        loading: false,
        loaded: false,
        responseStatus: action.payload
      };
      return newState;
    }
    case DomainActions.UNLOAD: {
      const newState: State = {
        results: undefined,
        loading: false,
        loaded: false,
        responseStatus: undefined
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}

