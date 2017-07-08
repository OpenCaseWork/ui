import { Action }                         from '@ngrx/store';
import { ResponseStatus, BaseEntity, EntityRequest }  from '../../core/models/request-response.models';

export const OPEN_DIALOG              = 'Open Dialog';
export const CLOSE_DIALOG              = 'Close Dialog';
export const CANCEL_DIALOG              = 'Cancel Dialog';

export class OpenDialogAction implements Action {
  readonly type = OPEN_DIALOG;
  constructor(public payload: BaseEntity, public index: number) {}
}

export class CloseDialogAction implements Action {
  readonly type = CLOSE_DIALOG;
  constructor(public payload: BaseEntity, public index: number) {}
}

export class CancelDialogAction implements Action {
  readonly type = CANCEL_DIALOG;
  constructor(public payload: BaseEntity, public index: number) {}
}
 
/**
 * Alias of all actions in this action group
 */
export type Actions
  = OpenDialogAction
  | CloseDialogAction
  | CancelDialogAction;
