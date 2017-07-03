import { BaseResponse } from '../root.models';

export class BaseRequest {
  public resource: string;
}

export class BaseSearchResponse<T> extends BaseResponse {
  public data: T[];
}

export class BasePostResponse<T> extends BaseResponse {
  public data: T;
}

export class BasePostRequest<T> {
  public data: T;
  public resource: string;
}
