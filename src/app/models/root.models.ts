export class BaseResponse {
  constructor() {

  }
  public responseInfo: ResponseStatus;
}

export class ResponseError {
  public errorCode: number;
  public fieldName: string;
  public message: string;
}

export class ResponseStatus {
  public statusCode: number;
  public message: string;
  public stackTrace: string;
  public errors: ResponseError[];
}

