import { Action } from '@ngrx/store';

import { ResponseStatus } from '../../core/models/request-response.models';


export const FAILURE  = 'StatusFailure';
export const SUCCESS  = 'StatusSuccess';

export class FailAction implements Action {
  readonly type = FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export class SuccessAction implements Action {
  readonly type = SUCCESS;
  constructor(public payload: ResponseStatus) {}
}


export type Actions = FailAction | SuccessAction;
