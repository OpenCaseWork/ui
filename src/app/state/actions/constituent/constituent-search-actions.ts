import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../../models/root.models';
import { BaseSearchResponse } from '../../../core/state/base-search-response';
import {
  ConstituentSearchRequest,
  ConstituentSearchRecord
} from '../../../models/constituents/search/constituents-search.models';

export const SEARCH = 'Search';
export const LOADING = 'Loading';
export const LOADED = 'Loaded';
export const SEARCH_SUCCESS = 'Success';
export const SEARCH_FAILURE = 'Failure';
export const SELECTED = 'Selected';
export const UNLOAD = 'Unload';

export class SearchAction implements Action {
  readonly type = SEARCH;
  constructor(public payload: ConstituentSearchRequest) { }
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor(public payload: BaseSearchResponse<ConstituentSearchRecord>) { }
}

export class SearchFailAction implements Action {
  readonly type = SEARCH_FAILURE;
  constructor(public payload: ResponseStatus) { }
}

export class LoadingAction implements Action {
  readonly type = LOADING;
  constructor(public payload: boolean) { }
}

export class LoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: boolean) { }
}

export class SelectAction implements Action {
  readonly type = SELECTED;
  constructor(public payload: ConstituentSearchRecord[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchSuccessAction
  | LoadingAction
  | LoadedAction
  | SearchFailAction
  | SelectAction;
