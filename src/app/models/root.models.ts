import { responseStatus } from '../state/reducers/constituent/constituent-search-reducer';

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

export class EntityRequest {
  public resource: string;
  public id: number;
}
