export class BaseResponse {
  constructor() {

  }
  public responseInfo: ResponseStatus;
}

export class ResponseError {
  public errorCode: string;
  public fieldName: string;
  public message: string;
}

export class ResponseStatus {
  public errorCode: string;
  public message: string;
  public stackTrace: string;
  public errors: ResponseError[];
}

