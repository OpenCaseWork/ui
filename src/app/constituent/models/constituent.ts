export class Constituent {
  public constituentId: number;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public nickName: string;
  public maidenName: string;
  public address1: string;
  public address2: string;
  public cityID: number;
  public townshipID: number;
  public stateCd: string;
  public postalCodeID: number;
  public postalCode: string;
  public titleID: number;
  public suffixID: number;
  public federalID: string;
  public birthDate: Date;
  public genderId: number;
  public minorityId: number;
  public incomeLevelId: number;  
  public demographics: ConstituentDemographics;
}

export class ConstituentDemographics {
    public livingAlone: boolean;
    public livesInNursingHome: boolean;
    public frailDisabled: boolean;
    public limitedEnglish: boolean;
    public caseWorkerRisk: boolean;
    public homeless: boolean;
    public femaleHeadedHousehold: boolean;
    public pet: boolean;
}
