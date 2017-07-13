import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'ocw-demographics',
  templateUrl: './demographics.component.html',
  /* styleUrls: ['./demographics.component.css'] */
})
export class DemographicsComponent implements OnInit, OnChanges, AfterViewInit {
  //@Input() constituent: Constituent;
  //@Input() domains: ConstituentDomains;
  demographicsForm: FormGroup;
  filteredMinority: Observable<SelectItem[]>;
  filteredEthnicity: Observable<SelectItem[]>;
  filteredIncomeLevel: Observable<SelectItem[]>;
  filteredPreferredLanguage: Observable<SelectItem[]>;
  mask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  // control references for validation
  birthDate: AbstractControl;

  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) {
    //this.createForm();
    //this.birthDate = this.demographicsForm.controls['birthDate'];
    console.log('DemographicsComponent.constructor');
  }

  ngAfterViewInit() {
 
  }

  ngOnInit() {
    console.log('DemographicsComponent.onInit');
  }

  ngOnChanges() {
    console.log('DemographicsComponent.onChanges');
  }

  

}
