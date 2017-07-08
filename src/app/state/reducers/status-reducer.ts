import { createSelector } from 'reselect';

import * as StatusActions from '../actions/status-actions';
import { ResponseStatus } from '../../core/models/request-response.models';

export interface State {
  responseStatus: ResponseStatus;
};

export const initialState: State = {
  responseStatus: undefined
};

// Define State Selector for convenience
export const responseStatus = (state: State ) => state.responseStatus;

// Reducer responses to Action and handles state change
export function reducer(state = initialState, action: StatusActions.Actions): State {
  switch (action.type) {
    case StatusActions.FAILURE: {
      const newState: State = {
        responseStatus: action.payload
      };
      return newState;
    }
    case StatusActions.SUCCESS: {
      const newState: State = {
        responseStatus: action.payload
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
