import { Action }                         from '@ngrx/store';
import { IndexedPayload } from './indexed-payload';

import { ResponseStatus, EntityRequest, BaseEntity,
         BaseResponse, BasePostRequest }  from '../../core/models/request-response.models';

export const GET              = 'Resource Get';
export const GET_SUCCESS      = 'Resource GetSuccess';
export const GET_FAILURE      = 'Resource GetFailure';
export const SAVE             = 'Resource Save';
export const SAVE_SUCCESS     = 'Resource SaveSuccess';
export const SAVE_FAILURE     = 'Resource SaveFailure';
export const NEW              = 'Resource New';
export const NEW_SUCCESS      = 'Resource New Success';

export class GetAction implements Action {
  readonly type = GET;
  constructor(public payload: EntityRequest) {}
}

export class GetSuccessAction implements Action {
  readonly type = GET_SUCCESS;
  constructor(public payload: BaseResponse) {}
}

export class GetFailAction implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;
  constructor(public payload: BasePostRequest) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: BaseResponse) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class NewAction implements Action {
  readonly type = NEW;
  constructor(public payload: BaseEntity) {}
}

export class NewSucessAction implements Action {
  readonly type = NEW_SUCCESS;
  constructor(public payload: IndexedPayload<boolean>) {}
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
  | NewAction;
