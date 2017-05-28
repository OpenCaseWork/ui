import { BaseResponse } from '../../root.models';

export class ConstituentSearchRecord {
  public id: number;
  public name: string;
  public address: string;
  public phone: string;
  public city: string;
  public state: string;
  public postalCode: string;
}

export class ConstituentSearchRequest {
  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public sSN: string;
}

export class ConstituentSearchResponse extends BaseResponse {
  public records: ConstituentSearchRecord[];
}

