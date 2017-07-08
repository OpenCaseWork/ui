import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../core/models/request-response.models';
import { BaseDomains } from '../../models/domains/domains.models';
import { BaseRequest, BaseResponse } from '../../core/models/request-response.models';

export class BaseDomainActions {
  public domainName: string;
  public LOAD: string;
  public LOADING: string;
  public LOADED: string;
  public LOAD_SUCCESS: string;
  public LOAD_FAILURE: string;
  public UNLOAD: string;

  constructor(name: string) {
    this.domainName = name;
    this.LOAD = this.domainName + ':Load Domains';
    this.LOADING = this.domainName + ':Loading Domains';
    this.LOADED = this.domainName + ':Loaded Domains';
    this.LOAD_SUCCESS = this.domainName + ':Success Domains';
    this.LOAD_FAILURE = this.domainName + ':Failure Domains';
    this.UNLOAD = this.domainName + ':Unload Domains';
  }
} 

export const LOAD = ':Load Domains';
export const LOADING = ':Loading Domains';
export const LOADED = ':Loaded Domains';
export const LOAD_SUCCESS = ':Success Domains';
export const LOAD_FAILURE = ':Failure Domains';
export const UNLOAD = ':Unload Domains';

export class DomainLoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: BaseRequest, public index: number) {}
}

export class DomainLoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: BaseResponse<BaseDomains>, public index: number) {}
}

export class DomainLoadFailAction implements Action {
  readonly type: string;
  constructor(public payload: ResponseStatus , public index: number) {}
}

export class DomainLoadingAction implements Action {
  readonly type = LOADING;
  constructor(public payload: boolean, public index: number) { }
}

export class DomainLoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: boolean, public index: number) { }
}

export class DomainUnloadAction implements Action {
  readonly type = UNLOAD;
  constructor(public payload: boolean, public index: number) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DomainActions
  = DomainLoadAction
  | DomainLoadSuccessAction
  | DomainLoadFailAction
  | DomainLoadingAction
  | DomainLoadedAction
  | DomainUnloadAction;
