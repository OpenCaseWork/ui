import { createSelector } from 'reselect';

import * as ResourceActions             from '../actions/resource-actions';
import { ResponseStatus, BaseEntity }   from '../../core/models/request-response.models';
import { ResourceEnum }                 from '../resources/resource.service';
import { EnumExtension }                from '../../core/extensions/enum-extension';

export interface ResourceState {
  resources: Array<ResourceSlice>;
}

export interface ResourceSlice {
  results: BaseEntity;
  loading: boolean;
  new: boolean;
};

export const initialSliceState: ResourceSlice = {
  results: undefined,
  loading: false,
  new: false
};

function fillResources(): Array<ResourceSlice> {
  let counter = 0;
  let array = new Array<ResourceSlice>();
  const values = EnumExtension.getValues(ResourceEnum);
  values.forEach(element => {
    let domainState = initialSliceState;
    array[counter] = domainState;
    counter++;
  });
  return array;
}

export const initialState: ResourceState = {
  resources: fillResources()
};

export function reducer(state = initialState, action: ResourceActions.Actions): ResourceState {
  console.log('resource reducer:' + action.type);
  switch (action.type) {
    case ResourceActions.GET: {
      let existingResults = state.resources[action.index].results;
      const resourceSlice: ResourceSlice = Object.assign({}, initialSliceState, {
        loading: true,
        results: existingResults,
        new: false
      });
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.GET_SUCCESS: {
      const resourceSlice: ResourceSlice =  {
        results: action.payload.data,
        loading: false,
        new: false
      };
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.GET_FAILURE: {
      const resourceSlice: ResourceSlice = {
        results:  new BaseEntity(),
        loading: false,
        new: false
      };
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.SAVE: {
      let existingResults = state.resources[action.index].results;
      const resourceSlice: ResourceSlice = Object.assign({}, initialSliceState, {
        loading: true,
        results: existingResults,
        new: false
      });
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.SAVE_SUCCESS: {
      const resourceSlice: ResourceSlice = Object.assign({}, initialSliceState, {
        results: action.payload.data,
        loading: false,
        new: false
      });
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.SAVE_FAILURE: {
      const resourceSlice: ResourceSlice = Object.assign({}, initialSliceState, {
        loading: false,
      });
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    case ResourceActions.NEW: {
      const resourceSlice: ResourceSlice = {
        results: action.payload,
        loading: false,
        new: true
      };
      let newState = generateNewState(state, resourceSlice, action.index);
      return newState;
    }
    default: {
      return state;
    }
  }
}


function generateNewState(currentState: ResourceState, newItem: ResourceSlice, key: number): ResourceState {
  let domain = currentState.resources[key];
  let newState: ResourceState = {resources: new Array<ResourceSlice>() };
  if (domain) {
    // console.log('update array, key = ' + key);
    newState.resources = updateObjectInArray(currentState.resources, newItem, key);
  } else {
    // console.log('insert array');
    newState.resources = insertItem(currentState.resources, newItem, key);
  }
  return newState;
}

function insertItem(array: Array<ResourceSlice>, newItem: ResourceSlice, key: number): Array<ResourceSlice> {
    let newArray = array.slice();
    newArray.splice(key, 0, newItem);
    return newArray;
}

function updateObjectInArray(array: Array<ResourceSlice>, updatedItem: ResourceSlice, key: number): Array<ResourceSlice> {
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
