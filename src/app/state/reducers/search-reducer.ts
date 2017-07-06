import * as SearchActions           from '../actions/search-actions';
import { ResponseStatus, BaseEntity } from '../../core/models/request-response.models';
import { EnumExtension } from '../../core/extensions/enum-extension';
import { SearchEnum } from '../resources/resource.service';

export interface SearchState {
  searches: Array<SearchSlice>;
}

export interface SearchSlice {
  results: Array<BaseEntity>;
  selected: Array<BaseEntity>;
  loading: boolean;
  loaded: boolean;
  responseStatus: ResponseStatus;
};

export const initialSliceState: SearchSlice = {
  results: undefined,
  selected: undefined,
  loading: false,
  loaded: false,
  responseStatus: undefined
};

function fillSearches(): Array<SearchSlice> {
  let counter = 0;
  let array = new Array<SearchSlice>();
  const values = EnumExtension.getValues(SearchEnum);
  values.forEach(element => {
    let state = initialSliceState;
    array[counter] = state;
    counter++;
  });
  return array;
}

export const initialState: SearchState = {
  searches: fillSearches()
};


export function reducer(state = initialState, action: SearchActions.Actions): SearchState {
  console.log('base search reducer:' + action.type);
  switch (action.type) {
    case SearchActions.SEARCH: {
      const searchSlice: SearchSlice = Object.assign({}, initialSliceState, {
        loading: true
      });
      let newState = generateNewState(state, searchSlice, action.index);
      return newState;
    }
    case SearchActions.SEARCH_SUCCESS: {
      const searchSlice: SearchSlice =  {
        results: action.payload.data,
        selected: undefined,
        loading: false,
        loaded: true,
        responseStatus: action.payload.responseInfo
      };
      let newState = generateNewState(state, searchSlice, action.index);
      return newState;
    }
    case SearchActions.SEARCH_FAILURE: {
      const searchSlice: SearchSlice = {
        results: undefined,
        selected: undefined,
        loading: false,
        loaded: false,
        responseStatus: action.payload
      };
      let newState = generateNewState(state, searchSlice, action.index);
      return newState;
    }
    case SearchActions.SELECTED: {
       const searchSlice = Object.assign({}, initialSliceState, {
        selected: action.payload
      });
      let newState = generateNewState(state, searchSlice, action.index);
      return newState;
    }
    default: {
      return state;
    }
  }
}

function generateNewState(currentState: SearchState, newItem: SearchSlice, key: number): SearchState {
  let domain = currentState.searches[key];
  let newState: SearchState = {searches: new Array<SearchSlice>() };
  if (domain) {
    // console.log('update array, key = ' + key);
    newState.searches = updateObjectInArray(currentState.searches, newItem, key);
  } else {
    // console.log('insert array');
    newState.searches = insertItem(currentState.searches, newItem, key);
  }
  return newState;
}

function insertItem(array: Array<SearchSlice>, newItem: SearchSlice, key: number): Array<SearchSlice> {
    let newArray = array.slice();
    newArray.splice(key, 0, newItem);
    return newArray;
}

function updateObjectInArray(array: Array<SearchSlice>, updatedItem: SearchSlice, key: number): Array<SearchSlice> {
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


