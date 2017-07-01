import { Action } from '@ngrx/store';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { ResponseStatus } from '../../../models/root.models';

export const GET          = 'Get';
export const GET_SUCCESS     = 'GetSuccess';
export const GET_FAILURE     = 'GetFailure';
export const SAVE            = 'Save';
export const SAVE_SUCCESS     = 'SaveSuccess';
export const SAVE_FAILURE     = 'SaveFailure';

export class GetAction implements Action {
  readonly type = GET;
  constructor(public payload: number) {}
}

export class GetSuccessAction implements Action {
  readonly type = GET_SUCCESS;
  constructor(public payload: ConstituentAggregate) {}
}

export class GetFailAction implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;
  constructor(public payload: ConstituentAggregate) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: ConstituentAggregate) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAILURE;
  constructor(public payload: ResponseStatus) {}
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
  | SaveFailAction;