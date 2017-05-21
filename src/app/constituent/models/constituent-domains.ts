export class ConstituentDomains {
    public titles: Title[];
    public suffixes: Suffix[];
    public cities: City[];
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

/*[Table("city")]*/
export class City {
    /*[Column("CITY_ID")]*/
    public cityId: number;
    /*[Column("CITY_CODE")]*/
    public cityCode: number;
    /*[Column("city")]*/
    public cityName: string;
}