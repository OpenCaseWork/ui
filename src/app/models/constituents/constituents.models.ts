import { AuditedEntity } from '../Audit/audit.models';
import { SelectItem } from '../Domains/domains.models';

export class Constituent extends AuditedEntity {

  constructor() {
    super();
    this.constituentId = 0;
  }
  /*[Column("constituent_id")]*/
  public constituentId: number;
  /*[Column("title_id")]*/
  public titleId: number;
  /*[Column("first_name")]*/
  public firstName: string;
  /*[Column("last_name")]*/
  public lastName: string;
  /*[Column("middle_name")]*/
  public middleName: string;
  /*[Column("suffix_id")]*/
  public suffixId: number;
  public nickName: string;
  /*[Column("addr1")]*/
  public address1: string;
  /*[Column("addr2")]*/
  public address2: string;
  /*[Column("city_id")]*/
  public cityId: number;
  /*[Column("township_id")]*/
  public townshipId: number;
  /*[Column("state_id")]*/
  public stateId: number;
  /*[Column("state_cd")]*/
  public stateCd: string;
  /*[Column("zip_id")]*/
  public postalCodeId: number;
  /*[Column("zip_code")]*/
  private postalCode: string;
  /*[Column("federal_id")]*/
  public federalId: string;
  /*[Column("birth_date")]*/
  public birthDate: Date;
  /*[Column("gender")]*/
  public genderId: number;
  public gender: SelectItem;
  /*[Column("minority_id")]*/
  public minorityId: number;
  /*[Column("income_level_id")]*/
  public incomeLevelId: number;
  /*[Column("maiden_name")]*/
  public maidenName: string;
  /*[Column("living_alone")]*/
  public livingAlone: boolean;
  /*[Column("lives_in_nursing_home")]*/
  public livesInNursingHome: boolean;
  /*[Column("frail_disabled")]*/
  public frailDisabled: boolean;
  /*[Column("limited_english")]*/
  public limitedEnglish: boolean;
  /*[Column("case_worker_risk")]*/
  public caseWorkerRisk: boolean;
  /*[Column("homeless")]*/
  public homeless: boolean;
  /*[Column("female_headed_household")]*/
  public femaleHeadedHousehold: boolean;
  /*[Column("pet")]*/
  public pet: boolean;
  /*[Column("select_fields")]*/

}

/*[Table("contact")]*/
export class ConstituentContact extends AuditedEntity {
  /*[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
[Column("contact_id")]*/
  public id: number;
  /*[Column("parent_id")]*/
  public constituentId: number;
  /*[Column("contact_type_id")]*/
  public contactTypeId: number;
  /*[Column("contact_text")]*/
  public contactValue: string;
  /*[Column("contact_text_2")]*/
  public contactValue2: string;
  /*[Column("contact_notes")]*/
  public notes: string;
  /*[Column("extension")]*/
  public extension: string;
  
  public fieldName: string;
  public placeHolder: string;
  public isPhone: boolean;
  public uiSequence: number;
}

/*[Table("constituent_notes")]*/
export class ConstituentNote extends AuditedEntity {
  /*[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
[Column("constituent_note_id")]*/
  public id: number;
  /*[Column("constituent_id")]*/
  public constituentId: number;
  /*[Column("notes")]*/
  public notes: string;
}

