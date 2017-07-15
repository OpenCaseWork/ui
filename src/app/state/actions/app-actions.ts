import { Action }                         from '@ngrx/store';
import { ResponseStatus, BaseEntity, EntityRequest }  from '../../core/models/request-response.models';

export const GET              = 'State Get';
export const SET              = 'State Save';
export const NEW              = 'State New';

export class GetAction implements Action {
  readonly type = GET;
  constructor(public payload: EntityRequest) {}
}

export class SetAction implements Action {
  readonly type = SET;
  constructor(public payload: BaseEntity) {}
}

export class NewAction implements Action {
  readonly type = NEW;
  constructor(public payload: BaseEntity) {}
}
 
/**
 * Alias of all actions in this action group
 */
export type Actions
  = GetAction
  | SetAction
  | NewAction;
