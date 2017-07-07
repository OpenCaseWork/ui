import { Action } from '@ngrx/store';

import { ResponseStatus, BasePostRequest, BaseResponse, BaseFilter, BaseEntity } from '../../core/models/request-response.models';

export const SEARCH = 'Search';
export const LOADING = 'Loading';
export const LOADED = 'Loaded';
export const SEARCH_SUCCESS = 'Success';
export const SEARCH_FAILURE = 'Failure';
export const SELECTED = 'Selected';
export const UNLOAD = 'Unload';

export class SearchAction implements Action {
  readonly type = SEARCH;
  constructor(public payload: BasePostRequest<BaseFilter>, public index: number) { }
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;
  constructor(public payload: BaseResponse<Array<BaseEntity>>, public index: number) { }
}

export class SearchFailAction implements Action {
  readonly type = SEARCH_FAILURE;
  constructor(public payload: ResponseStatus, public index: number) { }
}

export class LoadingAction implements Action {
  readonly type = LOADING;
  constructor(public payload: boolean, public index: number) { }
}

export class LoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: boolean, public index: number) { }
}

export class SelectAction implements Action {
  readonly type = SELECTED;
  constructor(public payload: BaseEntity[], public index: number) { }
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
