import { Action } from '@ngrx/store';
import { ResponseStatus } from '../../../models/root.models';

export const FAILURE     = 'GetFailure';

export class FailAction implements Action {
  readonly type = FAILURE;
  constructor(public payload: ResponseStatus) {}
}

export type Actions = FailAction;
