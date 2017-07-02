import { BaseResponse } from '../root.models';

export class BaseDomainsRequest {
  public resource: string;
}
export class BaseDomainsResponse extends BaseResponse {
  public data: any;
}
export class BaseSearchRecord {

}
export class BaseSearchRequest {
  public resource: string;
}
export class BaseSearchResponse<T> extends BaseResponse {
  public data: T[];
}