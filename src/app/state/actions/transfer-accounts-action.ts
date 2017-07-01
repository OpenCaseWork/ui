import { Action } from '@ngrx/store';

export const FROM_LOAD             = '[Transfer From] Load';
export const FROM_LOADING          = '[Transfer From] Loading';
export const FROM_LOAD_SUCCESS     = '[Transfer From] Load Success';
export const TO_LOAD             = '[Transfer To] Load';
export const TO_LOADING          = '[Transfer To] Loading';
export const TO_LOAD_SUCCESS     = '[Transfer To] Load Success';



export class BaseResponse {
  public isValid: boolean;
  public httpStatusCode: number;
  public unreadMessageCount: number;

  constructor() {
    this.isValid = false;
    this.httpStatusCode = 200;
    this.unreadMessageCount = -1;
  }
}


export class ResponseInfo<T> extends BaseResponse {
  public dataInfo: T;

  constructor() {
    super();
    this.dataInfo = null;
  }
}


export class TransferAccountInfo {
    public accountId: string;
    public accountNumber: string;
    /*[JsonConverter(typeof(StringEnumConverter))]*/
      public LastName: string;
    public balance: number;
    public description: string;
    public isAvailable: boolean;
    public nickName: string;
}

export class FromLoadAction implements Action {
  readonly type = FROM_LOAD;
  constructor(public payload: string) {}
}

export class FromLoadSuccessAction implements Action {
  readonly type = FROM_LOAD_SUCCESS;
  constructor(public payload: ResponseInfo<TransferAccountInfo[]>) {}
}

export class FromLoadingAction implements Action {
  readonly type = FROM_LOADING;
  constructor(public payload: boolean) {}
}

export class ToLoadAction implements Action {
  readonly type = TO_LOAD;
  constructor(public payload: string) {}
}

export class ToLoadSuccessAction implements Action {
  readonly type = TO_LOAD_SUCCESS;
  constructor(public payload: ResponseInfo<TransferAccountInfo[]>) {}
}

export class ToLoadingAction implements Action {
  readonly type = TO_LOADING;
  constructor(public payload: boolean) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = FromLoadAction
  | FromLoadSuccessAction
  | FromLoadingAction
  | ToLoadAction
  | ToLoadSuccessAction
  | ToLoadingAction;
