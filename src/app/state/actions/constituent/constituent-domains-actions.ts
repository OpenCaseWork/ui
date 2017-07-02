import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../../models/root.models';
import { ConstituentDomains } from '../../../models/constituents/domains/constituents-domains.models';
import { BaseDomainsRequest, BaseDomainsResponse } from '../../../models/base/base.models';

export const LOAD = 'Load Domains';
export const LOADING = 'Loading Domains';
export const LOADED = 'Loaded Domains';
export const LOAD_SUCCESS = 'Success Domains';
export const LOAD_FAILURE = 'Failure Domains';
export const UNLOAD = 'Unload Domains';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: BaseDomainsRequest) { }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: BaseDomainsResponse) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAILURE;
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

export class UnloadAction implements Action {
  readonly type = UNLOAD;
  constructor(public payload: boolean) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadingAction
  | LoadedAction
  | LoadFailAction
  | LoadAction
  | UnloadAction;
