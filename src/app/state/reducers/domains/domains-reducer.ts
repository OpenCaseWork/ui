import { createSelector } from 'reselect';

import * as Actions                         from '../../actions/base-domains-actions';
import { DomainEnum }                       from '../../resources/resource.service';
import { ResponseStatus, BaseResponse }     from '../../../core/models/request-response.models';
import { EnumExtension }                    from '../../../core/extensions/enum-extension';
import { BaseDomains }                      from '../../../models/domains/domains.models';


export interface FullDomainsState {
  domains: Array<DomainsState>;

}

export interface DomainsState {
  results: BaseDomains;
  loading: boolean;
  loaded: boolean;
  responseStatus: ResponseStatus;
}

export const initialDomainsState: DomainsState = {
  results: undefined,
  loading: false,
  loaded: false,
  responseStatus: undefined
};

function fillDomains(): Array<DomainsState> {
  let counter = 0;
  let array = new Array<DomainsState>();
  const values = EnumExtension.getValues(DomainEnum);
  values.forEach(element => {
    let domainState = initialDomainsState;
    array[counter] = domainState;
    counter++;
  });
  return array;
}

/*export const initialState: FullDomainsState = {
  domains1: new DomainsState();
};*/

export const initialState: FullDomainsState = {
  domains: fillDomains()
};

// Define State Selector for convenience
// export function createReducer(actions: BaseDomainActions) {
// Reducer responses to Action and handles state change
//  return function reducer(currentState: FullDomainsState,  action: DomainActions): FullDomainsState {

export function reducer(currentState = initialState, action: Actions.DomainActions): FullDomainsState {
  console.log('domains collection reducer:' + action.type);
  // console.log('domain state' + JSON.stringify(initialState));
  switch (action.type) {
    case Actions.LOAD: {
      console.log('domains collection reducer load');
      const domainState: DomainsState = Object.assign({}, initialDomainsState, {
        loading: true
      });
      let newState = generateNewState(currentState, domainState, action.index);
      return newState;
    }
    case Actions.LOAD_SUCCESS: {
      const domainState: DomainsState = {
        results: (action.payload as BaseResponse<BaseDomains>).data,
        loading: false,
        loaded: true,
        responseStatus: (action.payload as BaseResponse<BaseDomains>).responseInfo
      };
      // console.log('domainstate object' + JSON.stringify(domainState));
      let newState = generateNewState(currentState, domainState, action.index);
      // console.log('currentState' + JSON.stringify(currentState));
      return newState;
    }
    case Actions.LOAD_FAILURE: {
      // const newState: FullDomainsState = Object.assign({}, currentState);
      const domainState: DomainsState = {
        results: undefined,
        loading: false,
        loaded: false,
        responseStatus: (action.payload as BaseResponse<BaseDomains>).responseInfo
      };
      let newState = generateNewState(currentState, domainState, action.index);
      return newState;
    }
    case Actions.UNLOAD: {
      // const newState: FullDomainsState = Object.assign({}, currentState);
      const domainState: DomainsState = {
        results: undefined,
        loading: false,
        loaded: false,
        responseStatus: undefined
      };
      let newState = generateNewState(currentState, domainState, action.index);
      return newState;
    }
    default: {
      // console.log('domain state' + JSON.stringify(currentState));
      return currentState;
    }
  }
}

function generateNewState(currentState: FullDomainsState, newItem: DomainsState, key: number): FullDomainsState {
  let domain = currentState.domains[key];
  let newState: FullDomainsState = {domains: new Array<DomainsState>() };
  if (domain) {
    // console.log('update array, key = ' + key);
    newState.domains = updateObjectInArray(currentState.domains, newItem, key);
  } else {
    // console.log('insert array');
    newState.domains = insertItem(currentState.domains, newItem, key);
  }
  return newState;
}

function insertItem(array: Array<DomainsState>, newItem: DomainsState, key: number): Array<DomainsState> {
    let newArray = array.slice();
    newArray.splice(key, 0, newItem);
    return newArray;
}

function updateObjectInArray(array: Array<DomainsState>, updatedItem: DomainsState, key: number): Array<DomainsState> {
    let newArray = array.map( (item, index) => {
        if (index !== key) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...updatedItem
        };
    });
    // console.log('updated array' + JSON.stringify(newArray));
    return newArray;
}
