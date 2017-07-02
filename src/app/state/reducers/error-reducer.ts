import { createSelector } from 'reselect';
import * as ErrorActions from '../actions/error/error-actions';
import { ResponseStatus } from '../../models/root.models';

export interface State {
  responseStatus: ResponseStatus;
};

export const initialState: State = {
  responseStatus: undefined
};

// Define State Selector for convenience
export const responseStatus = (state: State ) => state.responseStatus;

// Reducer responses to Action and handles state change
export function reducer(state = initialState, action: ErrorActions.Actions): State {
  switch (action.type) {
    case ErrorActions.FAILURE: {
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
