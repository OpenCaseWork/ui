import { Action } from '@ngrx/store';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { ResponseStatus, EntityRequest } from '../../../models/root.models';
import { BasePostResponse, BasePostRequest } from '../../../models/base/base.models';

export const GET          = 'Aggregate Get';
export const GET_SUCCESS     = 'Aggregate GetSuccess';
export const GET_FAILURE     = 'Aggregate GetFailure';
export const SAVE            = 'Aggregate Save';
export const SAVE_SUCCESS     = 'Aggregate SaveSuccess';
export const SAVE_FAILURE     = 'Aggregate SaveFailure';
export const NEW              = 'Aggregate New';
export const CREATED          = 'Aggregate Created'

export class GetAction implements Action {
  readonly type = GET;
  constructor(public payload: EntityRequest) {}
}

export class GetSuccessAction implements Action {
  readonly type = GET_SUCCESS;
  constructor(public payload: BasePostResponse<ConstituentAggregate>) {}
}

export class GetFailAction implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;
  constructor(public payload: BasePostRequest<ConstituentAggregate>) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: BasePostResponse<ConstituentAggregate>) {}
}

export class CreatedAction implements Action {
  readonly type = CREATED;
  constructor(public payload: boolean) {}
}


export class SaveFailAction implements Action {
  readonly type = SAVE_FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class NewAction implements Action {
  readonly type = NEW;
  constructor(public payload: ConstituentAggregate) {}
}

/**
 * Alias of all actions in this action group
 */
export type Actions
  = GetAction
  | GetSuccessAction
  | GetFailAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailAction
  | NewAction
  | CreatedAction;
