import { BaseResponse } from '../../core/models/response.model';

export class ConstituentSearchRecord {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  state: string;
}

export class ConstituentSearchResponse extends BaseResponse {
  records: ConstituentSearchRecord[];
}

export class ConstituentSearchRequest {
    public firstName: string;
    public lastName: string;
    public address: string;
    public city: string;
    public SSN: string;
}