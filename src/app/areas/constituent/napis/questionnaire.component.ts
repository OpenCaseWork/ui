import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, ViewChildren, ChangeDetectorRef, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  ConstituentDomains, City, Suffix,
  Title, PostalCode, Township, State
} from '../../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { SelectItem } from '../../../models/domains/domains.models';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ClientQuestionnaire, QuestionnaireAggregate } from '../../../models/questionnaires/questionnaire.models';

@Component({
  selector: 'ocw-questionnaire',
  templateUrl: './questionnaire.component.html',
})
export class QuestionnaireComponent implements OnChanges {

  form: FormGroup;

  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialogRef: MdDialogRef<QuestionnaireComponent>,
    @Inject(MD_DIALOG_DATA) public data: any)  {

    this.createForm();
  }

  ngOnChanges() {
    this.form.reset();
    //if (this.domains && this.domains.cities) {
    //  domainsPopulated = true;
    //}   
    //this.logService.log('NapisComponent.ngOnChanges');
  }

  createForm() {
    this.form = this.formBuilder.group({
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

    });
  }

  updateQuestionnaireFromForm(questionniare: QuestionnaireAggregate): QuestionnaireAggregate {
    const formModel = this.form.value;
    const saveQuestionnaire: QuestionnaireAggregate = Object.assign({}, questionniare, formModel);
    /*saveConstituent.suffixId = this.autoCompleteService.assignSelectValue(saveConstituent['suffix']);
    saveConstituent.titleId = this.autoCompleteService.assignSelectValue(saveConstituent['title']);
    saveConstituent.postalCodeId = this.autoCompleteService.assignSelectValue(saveConstituent['postal']);
    saveConstituent.cityId = this.autoCompleteService.assignSelectValue(saveConstituent['city']);
    saveConstituent.townshipId = this.autoCompleteService.assignSelectValue(saveConstituent['township']);
    saveConstituent.stateId = this.autoCompleteService.assignSelectValue(saveConstituent['state']);*/
    questionniare = saveQuestionnaire;
    return questionniare;
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.form);
    return this.form.valid;
  }

  select(): void {
    if (this.isValid()) {
      //this.autoCompleteService.getStringValue(this.domains.suffixes, this.constituent.constituent.suffixId);
      //console.log('selected value:', this.contactTypeControl.value);
      //this.dialogRef.close(this.contactTypeControl.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
