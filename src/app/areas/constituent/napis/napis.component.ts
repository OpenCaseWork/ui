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
import { ColumnDefinition, DataTableComponent } from '../../../shared/data-table/data-table.component';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { QuestionnaireComponent } from './questionnaire.component';
import { Subject } from 'rxjs/Subject';
import { QuestionnaireAggregate } from '../../../models/questionnaires/questionnaire.models';


@Component({
  selector: 'ocw-napis',
  templateUrl: './napis.component.html',
  styleUrls: ['./napis.component.css']
})
export class NapisComponent implements OnChanges, OnInit {
  @ViewChild(DataTableComponent) private tableComponent: DataTableComponent;
  @Input() constituent: ConstituentAggregate;
  @Input() domains: ConstituentDomains;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  dialogRef: MdDialogRef<QuestionnaireComponent>;
  form: FormGroup;

  columns: ColumnDefinition[];
  checkBox: boolean;
  data: any[];

  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MdDialog) {

    this.createForm();
    this.logService.log('NapisComponent.constructor');

    this.columns = new Array<ColumnDefinition>();
    let column: ColumnDefinition = {
      cdkColumnDef: 'Id',
      cdkHeaderCellDef: 'Id',
      dataType: 'number',
      fieldName: 'id'
    };
    this.columns.push(column);

    let column2: ColumnDefinition = {
      cdkColumnDef: 'ProviderNumber',
      cdkHeaderCellDef: 'Provider Number',
      dataType: 'string',
      fieldName: 'providerNumber'
    };
    this.columns.push(column2);

    let column3: ColumnDefinition = {
      cdkColumnDef: 'CreateDate',
      cdkHeaderCellDef: 'Create Date',
      dataType: 'Date',
      fieldName: 'createDate'
    };
    this.columns.push(column3);

    this.checkBox = true;

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.form.reset();
    let domainsPopulated: boolean;
    if (this.domains && this.domains.cities) {
      domainsPopulated = true;
    }
    this.data = new Array<any>();
    this.data.push({id: 1});
    this.logService.log('NapisComponent.ngOnChanges');
  }

  createForm() {
    this.form = this.formBuilder.group({
      birthDate: ['', [Validators.pattern(this.validatorService.dateRegex())]],
      livingAlone: ['', [Validators.pattern(this.validatorService.yesNoRegex())]],
      livesInNursingHome: ['', Validators.pattern(this.validatorService.yesNoRegex())]
    });
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.form);
    return this.form.valid;
  }

  updateConstituentFromForm(constituentToUpdate: ConstituentAggregate): ConstituentAggregate {
    const formModel = this.form.value;
    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate.constituent, formModel);
    constituentToUpdate.constituent = saveConstituent;
    return constituentToUpdate;
  }


  displaySelectValue(selected: SelectItem): any {
    console.log('selected:', selected);
    return selected ? selected.shortDescription : selected;
  }

    /***************************************************** */
  /* Called from HTML Template to add a new contact type */
  /***************************************************** */
  addQuestionnaire() {
    this.dialogRef = this.dialog.open(QuestionnaireComponent);

    this.dialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        this.logService.log('addContact result', result);
        if (result) {
          this.addNewQuestionnaire(result);
        }
      });
  }

  addNewQuestionnaire(placeHolder: QuestionnaireAggregate) {
    /*
    let defaults = this.domains.contactTypes.filter(p => p.placeHolder === placeHolder);
    this.updateLocalContacts(defaults);
    this.logService.log('local contacts count:', this.contacts.length);
    this.cd.markForCheck();*/
  }


}
