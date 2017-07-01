import { BaseSearchRecord } from './base-search-record';
import { BaseResponse } from '../../models/root.models';

export class BaseSearchResponse<T> extends BaseResponse {
  public data: Array<T>;
}
