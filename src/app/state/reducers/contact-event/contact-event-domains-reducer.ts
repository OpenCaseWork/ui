import { createSelector } from 'reselect';
import { BaseDomainActions, DomainActions } from '../../actions/base-domains-actions';
import { ResponseStatus, BaseResponse } from '../../../core/models/request-response.models';
import { BaseDomains } from '../../../models/domains/domains.models';
import { ResponseInfo } from '../../actions/transfer-accounts-action';
import { DomainsState } from '../domains/domains-reducer';

// Define State Selector for convenience
export function createReducer(actions: BaseDomainActions) {
// Reducer responses to Action and handles state change
  return function reducer(currentState: DomainsState,  action: DomainActions): DomainsState {
    console.log('custom domains reducer::' + action.type);
    switch (action.type) {
        case actions.LOAD: {
        const newState: DomainsState = Object.assign({}, currentState, {
          loading: true
        });
        return newState;
      }
      case actions.LOAD_SUCCESS: {
        const newState: DomainsState =  Object.assign({}, currentState, {
          results: (action.payload as BaseResponse<BaseDomains>).data,
          loading: false,
          loaded: true,
          responseStatus: (action.payload as BaseResponse<BaseDomains>).responseInfo
        });
        return newState;
      }
      case actions.LOAD_FAILURE: {
        const newState: DomainsState = {
          results: undefined,
          loading: false,
          loaded: false,
          responseStatus: (action.payload as ResponseStatus)
        };
        return newState;
      }
      case actions.UNLOAD: {
        const newState: DomainsState = {
          results: undefined,
          loading: false,
          loaded: false,
          responseStatus: undefined
        };
        return newState;
      }
      default: {
        return currentState;
      }
    }
  };
}
