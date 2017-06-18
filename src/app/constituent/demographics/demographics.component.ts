import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Constituent } from '../../models/constituents/constituents.models';
import {
  ConstituentDomains, City, Suffix,
  Title, PostalCode, Township, State
} from '../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../shared/control-services/validator.service';
import { SelectItem } from '../../models/domains/domains.models';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  /* styleUrls: ['./demographics.component.css'] */
})
export class DemographicsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() constituent: Constituent;
  @Input() domains: ConstituentDomains;
 
  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder) {
  }

  ngAfterViewInit() {
 
  }

  ngOnInit() {
 
  }

  ngOnChanges() {
    
  }

  

}
