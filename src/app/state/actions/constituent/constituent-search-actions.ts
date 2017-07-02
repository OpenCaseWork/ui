import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../../models/root.models';
import { BaseSearchResponse } from '../../../models/base/base.models';
import {
  ConstituentSearchRequest,
  ConstituentSearchRecord
} from '../../../models/constituents/search/constituents-search.models';

export const SEARCH = 'Constituents Search';
export const LOADING = 'Constituents Loading';
export const LOADED = 'Constituents Loaded';
export const SEARCH_SUCCESS = 'Constituents Success';
export const SEARCH_FAILURE = 'Constituents Failure';
export const SELECTED = 'Constituents Selected';
export const UNLOAD = 'Constituents Unload';

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
