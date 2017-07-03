import { ResponseStatus } from '../root.models';

export class BaseRequest {
  public resource: string;
  public id: number;
}

/*export class BaseSearchResponse<T> extends BaseResponse {
  public data: T[];
}*/

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
}
