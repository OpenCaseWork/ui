import { Action }                         from '@ngrx/store';

import { ResponseStatus, EntityRequest, BaseEntity,
         BaseResponse, BasePostRequest }  from '../../core/models/request-response.models';

export const GET              = 'Resource Get';
export const GET_SUCCESS      = 'Resource GetSuccess';
export const GET_FAILURE      = 'Resource GetFailure';
export const SAVE             = 'Resource Save';
export const SAVE_SUCCESS     = 'Resource SaveSuccess';
export const SAVE_FAILURE     = 'Resource SaveFailure';
export const NEW              = 'Resource New';

export class GetAction implements Action {
  readonly type = GET;
  constructor(public payload: EntityRequest, public index: number) {}
}

export class GetSuccessAction implements Action {
  readonly type = GET_SUCCESS;
  constructor(public payload: BaseResponse<BaseEntity>, public index: number) {}
}

export class GetFailAction implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: ResponseStatus, public index: number) {}
}

export class SaveAction implements Action {
  readonly type = SAVE;
  constructor(public payload: BasePostRequest<BaseEntity>, public index: number) {}
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: BaseResponse<BaseEntity>, public index: number) {}
}

export class SaveFailAction implements Action {
  readonly type = SAVE_FAILURE;
  constructor(public payload: ResponseStatus, public index: number) {}
}

export class NewAction implements Action {
  readonly type = NEW;
  constructor(public payload: BaseEntity, public index: number) {}
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
