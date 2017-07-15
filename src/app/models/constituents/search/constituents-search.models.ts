import { BaseFilter } from '../../../core/models/request-response.models';

/*[Table("constituent_search")]*/
export class ConstituentSearchRecord {
  /*[Column("provider_number")]*/
  public providerNumber: string;
  /*[Column("constituent_id")]*/
  public id: number;
  /*[Column("federal_id")]*/
  public federalId: string;
  /*[Column("birth_date")]*/
  public birthDate: Date;
  /*[Column("last_name")]*/
  public lastName: string;
  /*[Column("first_name")]*/
  public firstName: string;
  /*[Column("addr1")]*/
  public address: string;
  /*[Column("contact_text")]*/
  public phone: string;
  /*[Column("city")]*/
  public city: string;
  /*[Column("state")]*/
  public state: string;
  /*[Column("zip_code")]*/
  public postalCode: string;
  /*[Column("eccpis_id")]*/
  public eCCPIS: string;
  /*[Column("home_phone")]*/
  public homePhone: string;
  /*[Column("cell_phone")]*/
  public cellPhone: string;
  /*[Column("business_phone")]*/
  public businessPhone: string;
}

export class ConstituentSearchRequest extends BaseFilter {
  public firstName: string;
  public lastName: string;
  public address: string;
  public city: string;
  public sSN: string;
}

/*
export class ConstituentSearchResponse extends BaseResponse {
  public data: ConstituentSearchRecord[];
}*/

