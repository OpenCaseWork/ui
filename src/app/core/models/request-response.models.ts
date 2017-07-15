export class ResponseError {
  public errorCode: number;
  public fieldName: string;
  public message: string;
}

export class ResponseStatus {
  public errorEnumId: number;
  public statusCode: number;
  public message: string;
  public stackTrace: string;
  public stateIndex: number;
  public errors: ResponseError[];
  constructor() {
    this.statusCode = 0;
  }
}

export class BaseRequest {
  public resource: string;
  public id: number;
  public stateIndex: number;
  public successMessage: string;
  public failureMessage: string;
  public successUrl: string;
}

export class BaseResponse {
  public responseInfo: ResponseStatus;
  public stateIndex: number;
  public data: any;
  constructor() {
    this.responseInfo = new ResponseStatus();
  }
}

export class BaseEntity {
  public data: any;
  public stateIndex: number;
}

export class BaseEntityList {
  public data: Array<BaseEntity>;
  public stateIndex: number;
}

export class BaseFilter {
  public resource: string;
  public id: number;
  public successMessage: string;
  public failureMessage: string;
  public successUrl: string;
}

export class BasePostRequest {
  public data: any;
  public stateIndex: number;
  public resource: string;
  public successMessage: string;
  public failureMessage: string;
  public successUrl: string;
}

export class EntityRequest {
  public resource: string;
  public id: number;
  public stateIndex: number;
}

