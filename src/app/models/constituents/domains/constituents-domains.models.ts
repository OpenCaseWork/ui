export class ConstituentDomains {
  public cities: City[];
  public contactTypes: ContactType[];
  public postalCodes: PostalCode[];
  public states: State[];
  public suffixes: Suffix[];
  public titles: Title[];
  public townships: Township[];
}
/*[Table("city")]*/
export class City {
  /*[Column("CITY_ID")]*/
  public cityId: number;
  /*[Column("CITY_CODE")]*/
  public cityCode: number;
  /*[Column("city")]*/
  public cityName: string;
}

/*[Table("contact_type")]*/
export class ContactType {
  /*[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
[Column("contact_type_id")]*/
  public id: number;
  /*[Column("description")]*/
  public description: string;
  /*[Column("sequence")]*/
  public sequence: number;
  /*[Column("is_phone")]*/
  public isPhone: boolean;
}

/*[Table("zip_code")]*/
export class PostalCode {
  /*[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
[Column("zip_code_id")]*/
  public id: number;
  /*[Column("zip_code")]*/
  public townshipCode: number;
  /*[Column("state")]*/
  public state: string;
}

/*[Table("state")]*/
export class State {
  /*[Column("state_id")]*/
  public id: number;
  /*[Column("state")]*/
  public stateCd: string;
  /*[Column("state_name")]*/
  public stateName: string;
}

/*[Table("suffix")]*/
export class Suffix {
  /*[Column("suffix_id")]*/
  public suffixId: number;
  /*[Column("suffix_text")]*/
  public suffixText: string;
}

export class Title {
  /*[Column("title_id")]*/
  public titleId: number;
  /*[Column("title_text")]*/
  public titleText: string;
}

/*[Table("township")]*/
export class Township {
  /*[Column("township_id")]*/
  public id: number;
  /*[Column("township_code")]*/
  public townshipCode: number;
  /*[Column("township_name")]*/
  public townshipName: string;
}

