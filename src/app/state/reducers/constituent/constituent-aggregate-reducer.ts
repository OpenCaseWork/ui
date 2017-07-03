import { createSelector } from 'reselect';
import * as AggregateActions from '../../actions/constituent/constituent-aggregate-actions';
import { ResponseStatus } from '../../../core/models/request-response.models';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';

export interface State {
  results: ConstituentAggregate;
  loading: boolean;
};

export const initialState: State = {
  results: new ConstituentAggregate(),
  loading: false,
};

// Define Account State Selector for convenience
export const isLoading = (state: State) => state.loading;
export const results = (state: State ) => state.results;

// Reducer responses to Action and handles state change
export function reducer(state = initialState, action: AggregateActions.Actions): State {
  console.log('aggregate reducer:' + action.type);
  switch (action.type) {
    case AggregateActions.GET: {
      const newState: State = Object.assign({}, state, {
        loading: true
      });
      return newState;
    }
    case AggregateActions.GET_SUCCESS: {
      const newState: State =  {
        results: action.payload.data,
        loading: false,
      };
      return newState;
    }
    case AggregateActions.GET_FAILURE: {
      const newState: State = {
        results:  new ConstituentAggregate(),
        loading: false,
      };
      return newState;
    }
    case AggregateActions.SAVE: {
      const newState: State = Object.assign({}, state, {
        loading: true
      });
      return newState;
    }
    case AggregateActions.SAVE_SUCCESS: {
      const newState: State = Object.assign({}, state, {
        results: action.payload.data,
        loading: false,
      });
      return newState;
    }
    case AggregateActions.SAVE_FAILURE: {
      const newState: State = Object.assign({}, state, {
        loading: false,
      });
      return newState;
    }
    case AggregateActions.NEW: {
      const newState: State = {
        results: new ConstituentAggregate(),
        loading: false,
      }
      return newState;
    }
    default: {
      // console.log('Account reducer default action returning', state);
      return state;
    }
  }
}

