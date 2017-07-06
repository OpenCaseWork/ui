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
  public errors: ResponseError[];
  constructor() {
    this.statusCode = 0;
  }
}

export class BaseRequest {
  public resource: string;
  public id: number;
  public successMessage: string;
}

export class BaseResponse<T> {
  public responseInfo: ResponseStatus;
  public data: T;
  constructor() {
    this.responseInfo = new ResponseStatus();
  }
}

export class BasePostRequest<T> {
  public data: T;
  public resource: string;
  public successMessage: string;
}

export class EntityRequest {
  public resource: string;
  public id: number;
}

