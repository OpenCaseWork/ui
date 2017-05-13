export class BaseResponse {
  public responseInfo: ResponseStatus;
}

export class ResponseStatus {
  public errorCode: string;
  public message: string;
  public stackTrace: string;
  public errors: ResponseError[];
}

export class ResponseError {
  public errorCode: string;
  public fieldName: string;
  public message: string;
}