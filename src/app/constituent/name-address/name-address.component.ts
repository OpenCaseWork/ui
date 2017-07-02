import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
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
import { ConstituentContact } from '../../models/constituents/constituents.models';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';

@Component({
  selector: 'app-name-address',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './name-address.component.html',
  styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() constituent: ConstituentAggregate;
  @Input() domains: ConstituentDomains;
  //@ViewChild('lastName') vc;
  nameAddressForm: FormGroup;
  contactsForm: FormGroup;
  // emailFormControl: FormControl;
  contacts: Array<String>;

  filteredCities: Observable<SelectItem[]>;
  filteredSuffixes: Observable<SelectItem[]>;
  filteredTitles: Observable<SelectItem[]>;
  filteredPostalCodes: Observable<PostalCode[]>;
  filteredTownships: Observable<Township[]>;
  filteredStates: Observable<State[]>;

  cityControl = new FormControl();
  postalControl = new FormControl();
  townshipControl = new FormControl();
  statesControl = new FormControl();
  federalId: AbstractControl;
  emailFormControl: AbstractControl;


  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder) {
    this.emailFormControl = this.validatorService.createEmailControl();
    this.createForm();
    this.federalId = this.nameAddressForm.controls['federalId'];
    console.log('NameAddressComponent.constructor');
  }

  ngAfterViewInit() {
    console.log('NameAddressComponent.ngAfterViewInit');
    /*if (this.vc) {
      this.logService.log('set focus to last name');
      this.vc.nativeElement.focus();
    }*/
  }

  ngOnInit() {
    this.contacts = new Array<String>();
    this.contacts.push('', '', '', '');
  }

  ngOnChanges() {
    this.nameAddressForm.reset();
    if (this.domains && this.domains.cities) {
      if (!this.filteredCities) {
        this.filteredCities = this.autoCompleteService.filteredItem$<SelectItem>(
          this.domains.cities, this.cityControl, SELECT_DESCRIPTION_FIELD);
        this.filteredTitles = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.titles, this.nameAddressForm.controls['title'], SELECT_DESCRIPTION_FIELD);
        this.filteredSuffixes = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.suffixes, this.nameAddressForm.controls['suffix'], SELECT_DESCRIPTION_FIELD);
        this.filteredPostalCodes = this.autoCompleteService.filteredItem$<PostalCode>(
          this.domains.postalCodes, this.postalControl, 'code');
        this.filteredTownships = this.autoCompleteService.filteredItem$<Township>(
          this.domains.townships, this.townshipControl, 'townshipName');
        this.filteredStates = this.autoCompleteService.filteredItem$<State>(
          this.domains.states, this.statesControl, 'stateCd');
        this.logService.log('domains loaded');
      }
    } else {
      this.logService.log('empty domains!');
    }

    // populate form, but only if have populated constituent
    if (this.constituent && this.constituent.constituent) {
      this.nameAddressForm.patchValue(this.constituent.constituent, { onlySelf: true });
    } else {
      this.logService.log('empty constituent!');
    }
    this.logService.log('NameAddressComponent.ngOnChanges');
  }

  createForm() {
    this.nameAddressForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      federalId: ['', Validators.pattern(this.validatorService.ssnRegex())],
      middleName: ['', Validators.maxLength(50)],
      nickName: ['', Validators.maxLength(30)],
      maidenName: ['', Validators.maxLength(30)],
      address1: ['', Validators.maxLength(80)],
      address2: ['', Validators.maxLength(80)],
      title: '',
      suffix: ''
    });
  }

  createContactsForm() {
    this.contactsForm = this.formBuilder.group ({ })
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.nameAddressForm);
    return this.nameAddressForm.valid;
  }

  updateConstituentFromForm(constituentToUpdate: Constituent): Constituent {
    const formModel = this.nameAddressForm.value;
    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate, formModel);
    saveConstituent.suffixId = this.autoCompleteService.getIdValue(this.domains.suffixes, saveConstituent.suffix);
    return saveConstituent;
  }

}
