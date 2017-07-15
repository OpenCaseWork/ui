import { Action }                         from '@ngrx/store';
import { ResponseStatus, BaseEntity, EntityRequest }  from '../../core/models/request-response.models';

export const OPEN_DIALOG              = 'Open Dialog';
export const CLOSE_DIALOG              = 'Close Dialog';
export const CANCEL_DIALOG              = 'Cancel Dialog';

export class OpenDialogAction implements Action {
  readonly type = OPEN_DIALOG;
  constructor(public payload: BaseEntity) {}
}

export class CloseDialogAction implements Action {
  readonly type = CLOSE_DIALOG;
  constructor(public payload: BaseEntity) {}
}

export class CancelDialogAction implements Action {
  readonly type = CANCEL_DIALOG;
  constructor(public payload: BaseEntity) {}
}
 
/**
 * Alias of all actions in this action group
 */
export type Actions
  = OpenDialogAction
  | CloseDialogAction
  | CancelDialogAction;
