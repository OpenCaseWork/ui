import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Constituent } from '../../../models/constituents/constituents.models';
import {
  ConstituentDomains, City, Suffix,
  Title, PostalCode, Township, State
} from '../../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { SelectItem } from '../../../models/domains/domains.models';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';

@Component({
  selector: 'ocw-demographics',
  templateUrl: './demographics.component.html',
  /* styleUrls: ['./demographics.component.css'] */
})
export class DemographicsComponent implements OnChanges {
  @Input() constituent: ConstituentAggregate;
  @Input() domains: ConstituentDomains;
  demographicsForm: FormGroup;
  filteredRace: Observable<SelectItem[]>;
  filteredEthnicity: Observable<SelectItem[]>;
  filteredIncomeLevel: Observable<SelectItem[]>;
  filteredPreferredLanguage: Observable<SelectItem[]>;
  filteredGender: Observable<SelectItem[]>;
  filteredMaritalStatus: Observable<SelectItem[]>;
  mask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  yesNoMask = [/[YyNn]/];

  // control references for validation
  birthDate: AbstractControl;

  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.createForm();
    this.birthDate = this.demographicsForm.controls['birthDate'];
    console.log('DemographicsComponent.constructor');
  }



  ngOnChanges() {
    this.demographicsForm.reset();
    let domainsPopulated: boolean;
    if (this.domains && this.domains.cities) {
      domainsPopulated = true;
    }
    // populate domain dependent fields, only if domains populated, but fields note
    if (domainsPopulated && !this.filteredEthnicity) {
      this.filteredEthnicity = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.ethnicities, this.demographicsForm.controls['ethnicity'], SELECT_DESCRIPTION_FIELD);
      this.filteredGender = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.genders, this.demographicsForm.controls['gender'], SELECT_DESCRIPTION_FIELD);
      this.filteredIncomeLevel = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.incomeLevels, this.demographicsForm.controls['incomeLevel'], SELECT_DESCRIPTION_FIELD);
      this.filteredMaritalStatus = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.maritalStatuses, this.demographicsForm.controls['maritalStatus'], SELECT_DESCRIPTION_FIELD);
      this.filteredPreferredLanguage = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.languages, this.demographicsForm.controls['preferredLanguage'], SELECT_DESCRIPTION_FIELD);
      this.filteredRace = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
        this.domains.races, this.demographicsForm.controls['race'], SELECT_DESCRIPTION_FIELD);
      this.logService.log('demogrpahics domains loaded');
    }

    // populate form, but only if have populated constituent
    if (this.constituent && this.constituent.constituent && domainsPopulated) {
      this.logService.log('demographics constituent patch object', this.constituent.constituent);
      let patchObject = Object.assign({}, this.constituent.constituent);
      //const datePipe = new DatePipe('en-US');
      //patchObject.birthDate = datePipe.transform(this.constituent.constituent.birthDate, 'MM/dd/yyyy');

      this.autoCompleteService.setSelectValue(patchObject, patchObject.ethnicityId, this.domains.ethnicities, 'ethnicity');
      this.autoCompleteService.setSelectValue(patchObject, patchObject.genderId, this.domains.genders, 'gender');
      this.autoCompleteService.setSelectValue(patchObject, patchObject.incomeLevelId, this.domains.incomeLevels, 'incomeLevel');
      this.autoCompleteService.setSelectValue(patchObject, patchObject.maritalStatusId, this.domains.maritalStatuses, 'maritalStatus');
      this.autoCompleteService.setSelectValue(patchObject, patchObject.preferredLanguageId, this.domains.languages, 'preferredLanguage');
      this.autoCompleteService.setSelectValue(patchObject, patchObject.minorityId, this.domains.races, 'race');

      this.logService.log('demographics patch object', patchObject);
      this.demographicsForm.patchValue(patchObject, { onlySelf: true });
    }
    this.logService.log('DemographicComponent.ngOnChanges');
  }

  createForm() {
    this.demographicsForm = this.formBuilder.group({
      birthDate: ['', [Validators.pattern(this.validatorService.dateRegex())]],
      livingAlone: ['', [Validators.pattern(this.validatorService.yesNoRegex())]],
      livesInNursingHome: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      caseWorkerRisk: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      pet: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      homeless: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      femaleHeadedHousehold: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      frailDisabled: ['', Validators.pattern(this.validatorService.yesNoRegex())],
      eccpisNumber: [''],
      rinNumber: '',
      grgCount: '',

      ethnicity: '',
      gender: '',
      incomeLevel: '',
      maritalStatus: '',
      preferredLanguage: '',
      race: ''

    });
  }

  toUpper(value: KeyboardEvent, field: string) {
    if (value) {
      this.logService.log('key press', value, field);
      let patchObject = {};
      patchObject[field] = value.key.toUpperCase();
      this.demographicsForm.patchValue(patchObject);
    }
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.demographicsForm);
    return this.demographicsForm.valid;
  }

  updateConstituentFromForm(constituentToUpdate: ConstituentAggregate): ConstituentAggregate {
    const formModel = this.demographicsForm.value;
    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate.constituent, formModel);
    saveConstituent.ethnicityId = this.autoCompleteService.assignSelectValue(saveConstituent['ethnicity']);
    saveConstituent.genderId = this.autoCompleteService.assignSelectValue(saveConstituent['gender']);
    saveConstituent.incomeLevelId = this.autoCompleteService.assignSelectValue(saveConstituent['incomeLevel']);
    saveConstituent.maritalStatusId = this.autoCompleteService.assignSelectValue(saveConstituent['maritalStatus']);
    saveConstituent.preferredLanguageId = this.autoCompleteService.assignSelectValue(saveConstituent['preferredLanguage']);
    saveConstituent.minorityId = this.autoCompleteService.assignSelectValue(saveConstituent['race']);
    constituentToUpdate.constituent = saveConstituent;
    return constituentToUpdate;
  }


  displaySelectValue(selected: SelectItem): any {
    console.log('selected:', selected);
    return selected ? selected.shortDescription : selected;
  }


}
