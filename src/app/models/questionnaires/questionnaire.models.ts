export class ClientQuestionnaire  {
  /*[Column("questionaire_id")]*/
  public id: number;
  /*[Column("constituent_id")]*/
  public constituentId: number;
  /*[Column("PROVIDER_ID")]*/
  public providerId: number;
  /*[Column("EATING")]*/
  public eating: string;
  /*[Column("BATHING")]*/
  public bathing: string;
  /*[Column("GROOMING")]*/
  public grooming: string;
  /*[Column("Dressing")]*/
  public dressing: string;
  /*[Column("Transfer_Bed")]*/
  public transferBed: string;
  /*[Column("Incontinence")]*/
  public incontinence: string;
  /*[Column("Managing_Money")]*/
  public managingMoney: string;
  /*[Column("Telephoning")]*/
  public telephoning: string;
  /*[Column("PREPARING_MEALS")]*/
  public preparingMeals: string;
  /*[Column("Laundry")]*/
  public laundry: string;
  /*[Column("Housework")]*/
  public housework: string;
  /*[Column("OUTSIDE_HOME")]*/
  public outsideHome: string;
  /*[Column("ROUTINE_MED_DIRECTIONS")]*/
  public routineMedDirections: string;
  /*[Column("SPECIAL_MED_DIRECTIONS")]*/
  public specialMedDirections: string;
  /*[Column("BEING_ALONE")]*/
  public beingAlone: string;
  /*[Column("QUES1")]*/
  public ques1: string;
  /*[Column("Ques2")]*/
  public ques2: string;
  /*[Column("Ques3")]*/
  public ques3: string;
  /*[Column("Ques4")]*/
  public ques4: string;
  /*[Column("Ques5")]*/
  public ques5: string;
  /*[Column("Ques6")]*/
  public ques6: string;
  /*[Column("Ques7")]*/
  public ques7: string;
  /*[Column("Ques8")]*/
  public ques8: string;
  /*[Column("Ques9")]*/
  public ques9: string;
  /*[Column("Ques10")]*/
  public ques10: string;
  /*[Column("EATING_UNMET_NEED")]*/
  public eatingUnmetNeed: string;
  /*[Column("BATHING_UNMET_NEED")]*/
  public bathingUnmetNeed: string;
  /*[Column("GROOMING_UNMET_NEED")]*/
  public groomingUnmetNeed: string;
  /*[Column("DRESSING_UNMET_NEED")]*/
  public dressingUnmetNeed: string;
  /*[Column("TRANSFER_BED_UNMET_NEED")]*/
  public transferBedUnmetNeed: string;
  /*[Column("INCONTINENCE_UNMET_NEED")]*/
  public incontinenceUnmetNeed: string;
  /*[Column("MANAGING_MONEY_UNMET_NEED")]*/
  public managingMoneyUnmetNeed: string;
  /*[Column("TELEPHONING_UNMET_NEED")]*/
  public telephoningUnmetNeed: string;
  /*[Column("PREPARING_MEALS_UNMET_NEED")]*/
  public preparingMealsUnmetNeed: string;
  /*[Column("LAUNDRY_UNMET_NEED")]*/
  public laundryUnmetNeed: string;
  /*[Column("HOUSEWORK_UNMET_NEED")]*/
  public houseworkUnmetNeed: string;
  /*[Column("OUTSIDE_HOME_UNMET_NEED")]*/
  public outsideHomeUnmetNeed: string;
  /*[Column("ROUTINE_MED_DIRECTIONS_UNMET_NEED")]*/
  public routineMedDirectionsUnmetNeed: string;
  /*[Column("SPECIAL_MED_DIRECTIONS_UNMET_NEED")]*/
  public specialMedDirectionsUnmetNeed: string;
  /*[Column("BEING_ALONE_UNMET_NEED")]*/
  public beingAloneUnmetNeed: string;
  /*[Column("MEALS_ON_WHEELS")]*/
  public mealsOnWheels: string;
  /*[Column("CCP")]*/
  public ccp: string;
  /*[Column("HOME_HEALTH_CARE")]*/
  public homeHealthCare: string;
  /*[Column("PRIVATE_DUTY")]*/
  public privateDuty: string;
  /*[Column("MONEY_MANAGEMENT")]*/
  public moneyManagement: string;
  /*[Column("SENIOR_ADVOCACY")]*/
  public seniorAdvocacy: string;
  /*[Column("CHORE_HOUSEKEEPING")]*/
  public choreHousekeeping: string;
  /*[Column("TRANSPORTATION")]*/
  public transportation: string;
  /*[Column("ADULT_DAY_CARE")]*/
  public adultDayCare: string;
  /*[Column("TOTAL_DON_SCORE")]*/
  public totalDonScore: number;
  /*[Column("MMSE")]*/
  public mmse: number;
  /*[Column("FRIENDLY_VISITING")]*/
  public friendlyVisiting: string;
  /*[Column("PEER_COUNSELING")]*/
  public peerCounseling: string;
  /*[Column("LEGAL")]*/
  public legal: string;
  /*[Column("I_A")]*/
  public iA: string;
  /*[Column("RETIREMENT_NURSING")]*/
  public retirementNursing: string;
  /*[Column("ENTITLEMENTS")]*/
  public entitlements: string;
  /*[Column("RESPITE")]*/
  public respite: string;
  /*[Column("COUNSELING")]*/
  public counseling: string;
  /*[Column("ELDER_ABUSE_SERVICES")]*/
  public elderAbuseServices: string;
  /*[Column("SUPPORT_GROUP")]*/
  public supportGroup: string;
  /*[Column("EMERGENCY_RESPONSE_SYSTEM")]*/
  public emergencyResponseSystem: string;
  /*[Column("ADVANCE_DIRECTIVES")]*/
  public advanceDirectives: string;
  /*[Column("created_date")]*/
  public createdDate: Date;
  /*[Column("RIGHTS")]*/
  public rights: string;
  /*[Column("MEALS_ON_WHEELS_DISCUSSED")]*/
  public mealsOnWheelsDiscussed: string;
  /*[Column("CCP_DISCUSSED")]*/
  public ccpDiscussed: string;
  /*[Column("HOME_HEALTH_CARE_DISCUSSED")]*/
  public homeHealthCareDiscussed: string;
  /*[Column("PRIVATE_DUTY_DISCUSSED")]*/
  public privateDutyDiscussed: string;
  /*[Column("MONEY_MANAGEMENT_DISCUSSED")]*/
  public moneyManagementDiscussed: string;
  /*[Column("SENIOR_ADVOCACY_DISCUSSED")]*/
  public seniorAdvocacyDiscussed: string;
  /*[Column("CHORE_HOUSEKEEPING_DISCUSSED")]*/
  public choreHousekeepingDiscussed: string;
  /*[Column("TRANSPORTATION_DISCUSSED")]*/
  public transportationDiscussed: string;
  /*[Column("ADULT_DAY_CARE_DISCUSSED")]*/
  public adultDayCareDiscussed: string;
  /*[Column("COGNITIVELY_INTACT")]*/
  public cognitivelyIntact: string;
  /*[Column("COGNITIVELY_INTACT_UNMET_NEED")]*/
  public cognitivelyIntactUnmetNeed: string;
  /*[Column("ADVANCE_DIRECTIVES_IN_PLACE")]*/
  public advanceDirectivesInPlace: string;
  /*[Column("COUNSELING_IN_PLACE")]*/
  public counselingInPlace: string;
  /*[Column("ELDER_ABUSE_SERVICES_IN_PLACE")]*/
  public elderAbuseServicesInPlace: string;
  /*[Column("EMERGENCY_RESPONSE_SYSTEM_IN_PLACE")]*/
  public emergencyResponseSystemInPlace: string;
  /*[Column("ENTITLEMENTS_IN_PLACE")]*/
  public entitlementsInPlace: string;
  /*[Column("FRIENDLY_VISITING_IN_PLACE")]*/
  public friendlyVisitingInPlace: string;
  /*[Column("I_A_IN_PLACE")]*/
  public iAInPlace: string;
  /*[Column("LEGAL_IN_PLACE")]*/
  public legalInPlace: string;
  /*[Column("PEER_COUNSELING_IN_PLACE")]*/
  public peerCounselingInPlace: string;
  /*[Column("RESPITE_IN_PLACE")]*/
  public respiteInPlace: string;
  /*[Column("RETIREMENT_NURSING_IN_PLACE")]*/
  public retirementNursingInPlace: string;
  /*[Column("RIGHTS_IN_PLACE")]*/
  public rightsInPlace: string;
  /*[Column("SUPPORT_GROUP_IN_PLACE")]*/
  public supportGroupInPlace: string;
  /*[Column("CLIENT_AGREES")]*/
  public clientAgrees: string;
  /*[Column("MEALS_ON_WHEELS_REASON")]*/
  public mealsOnWheelsReason: string;
  /*[Column("CCP_REASON")]*/
  public ccpReason: string;
  /*[Column("HOME_HEALTH_CARE_REASON")]*/
  public homeHealthCareReason: string;
  /*[Column("PRIVATE_DUTY_REASON")]*/
  public privateDutyReason: string;
  /*[Column("MONEY_MANAGEMENT_REASON")]*/
  public moneyManagementReason: string;
  /*[Column("SENIOR_ADVOCACY_REASON")]*/
  public seniorAdvocacyReason: string;
  /*[Column("CHORE_HOUSEKEEPING_REASON")]*/
  public choreHousekeepingReason: string;
  /*[Column("TRANSPORTATION_REASON")]*/
  public transportationReason: string;
  /*[Column("ADULT_DAY_CARE_REASON")]*/
  public adultDayCareReason: string;
  /*[Column("COUNSELING_REASON")]*/
  public counselingReason: string;
  /*[Column("ELDER_ABUSE_SERVICES_REASON")]*/
  public elderAbuseServicesReason: string;
  /*[Column("FRIENDLY_VISITING_REASON")]*/
  public friendlyVisitingReason: string;
  /*[Column("PEER_COUNSELING_REASON")]*/
  public peerCounselingReason: string;
  /*[Column("RESPITE_REASON")]*/
  public respiteReason: string;
  /*[Column("SUPPORT_GROUP_REASON")]*/
  public supportGroupReason: string;
  /*[Column("IS_DEPRESSED")]*/
  public isDepressed: string;
  /*[Column("IS_STRESSED")]*/
  public isStressed: string;
  /*[Column("HAS_EMOTIONAL_ISSUES")]*/
  public hasEmotionalIssues: string;
  /*[Column("NEEDS_SOCIAL_SUPPORT")]*/
  public needsSocialSupport: string;
  /*[Column("MEANINGFUL_VOLUNTEER_ACTIVITY")]*/
  public meaningfulVolunteerActivity: string;
  /*[Column("HOUSING")]*/
  public housing: string;
  /*[Column("PRIVATE_GCM")]*/
  public privateGcm: string;
  /*[Column("HOUSING_IN_PLACE")]*/
  public housingInPlace: string;
  /*[Column("PRIVATE_GCM_IN_PLACE")]*/
  public privateGcmInPlace: string;
  /*[Column("created_by")]*/
  public createdBy: string;
  /*[Column("updated_date")]*/
  public updatedDate: Date;
  /*[Column("updated_by")]*/
  public updatedBy: string;
}

export class ClientQuestionnaireService  {
  /*[Column("questionaire_service_id")]*/
  public id: number;
  /*[Column("questionaire_service_guid")]*/
  public questionaireServiceGuid: string;
  /*[Column("questionaire_id")]*/
  public questionaireId: number;
  /*[Column("type_id")]*/
  public typeId: number;
  /*[Column("ads_ccp")]*/
  public adsCcp: string;
  /*[Column("ads_transport")]*/
  public adsTransport: string;
  /*[Column("ads")]*/
  public ads: string;
  /*[Column("adult_protective")]*/
  public adultProtective: string;
  /*[Column("advance_directives")]*/
  public advanceDirectives: string;
  /*[Column("advocacy_groups")]*/
  public advocacyGroups: string;
  /*[Column("ccp_homemaker")]*/
  public ccpHomemaker: string;
  /*[Column("chore_housekeeping")]*/
  public choreHousekeeping: string;
  /*[Column("counseling")]*/
  public counseling: string;
  /*[Column("ers_ccp")]*/
  public ersCcp: string;
  /*[Column("ers")]*/
  public ers: string;
  /*[Column("entitlements")]*/
  public entitlements: string;
  /*[Column("friendly_visiting")]*/
  public friendlyVisiting: string;
  /*[Column("grg_program")]*/
  public grgProgram: string;
  /*[Column("home_deliver_meals")]*/
  public homeDeliverMeals: string;
  /*[Column("home_health_care")]*/
  public homeHealthCare: string;
  /*[Column("housing")]*/
  public housing: string;
  /*[Column("legal")]*/
  public legal: string;
  /*[Column("money_management")]*/
  public moneyManagement: string;
  /*[Column("private_home_care")]*/
  public privateHomeCare: string;
  /*[Column("private_care_mgmt")]*/
  public privateCareMgmt: string;
  /*[Column("respite")]*/
  public respite: string;
  /*[Column("retirement")]*/
  public retirement: string;
  /*[Column("support_groups")]*/
  public supportGroups: string;
  /*[Column("transportation")]*/
  public transportation: string;
}

export class ClientQuestionnaireOther {
  /*[Column("questionaire_other_id")]*/
  public id: number;
  /*[Column("questionaire_other_guid")]*/
  public questionaireOtherGuid: string;
  /*[Column("questionaire_id")]*/
  public questionaireId: number;
  /*[Column("type_id")]*/
  public typeId: number;
  /*[Column("caregiver_stress")]*/
  public caregiverStress: string;
  /*[Column("other_stress")]*/
  public otherStress: string;
  /*[Column("other_mental_health")]*/
  public otherMentalHealth: string;
  /*[Column("social_support")]*/
  public socialSupport: string;
  /*[Column("legal_issues")]*/
  public legalIssues: string;
  /*[Column("financial_issues")]*/
  public financialIssues: string;
  /*[Column("hearing")]*/
  public hearing: string;
  /*[Column("chronic")]*/
  public chronic: string;
  /*[Column("home_safety")]*/
  public homeSafety: string;
  /*[Column("spirituality")]*/
  public spirituality: string;
}

export class QuestionnaireAggregate {
  public questionnaire: ClientQuestionnaire;
  public others: ClientQuestionnaireOther[];
  public services: ClientQuestionnaireService[];
}
