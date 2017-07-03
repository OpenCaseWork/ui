import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../../core/models/request-response.models';

export const FAILURE     = 'GetFailure';

export class FailAction implements Action {
  readonly type = FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export type Actions = FailAction;
