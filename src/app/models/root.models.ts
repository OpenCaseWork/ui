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
  public errorEnumId: number;
  public statusCode: number;
  public message: string;
  public stackTrace: string;
  public errors: ResponseError[];
}

export class EntityRequest {
  public resource: string;
  public id: number;
}
