import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Constituent } from '../../models/constituents/constituents.models';
import {
  ConstituentDomains, City, Suffix,
  Title, PostalCode, Township, State
} from '../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../core/logging/log.service';
import { AutoCompleteService } from '../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../shared/control-services/validator.service';

@Component({
  selector: 'app-name-address',
  templateUrl: './name-address.component.html',
  styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() constituent: Constituent;
  @Input() domains: ConstituentDomains;
  @ViewChild('lastName') vc;
  nameAddressForm: FormGroup;
  federalId: AbstractControl;
  email: AbstractControl;
  public contacts: Array<String>;

  filteredCities: Observable<City[]>;
  filteredSuffixes: Observable<Suffix[]>;
  filteredTitles: Observable<Title[]>;
  filteredPostalCodes: Observable<PostalCode[]>;
  filteredTownships: Observable<Township[]>;
  filteredStates: Observable<State[]>;

  cityControl = new FormControl();
  postalControl = new FormControl();
  townshipControl = new FormControl();
  statesControl = new FormControl();

  public emailFormControl: FormControl;

  constructor(private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder) {
    this.emailFormControl = this.validatorService.emailFormControl;
    this.createForm();
    this.federalId = this.nameAddressForm.controls['federalId'];
  }

  ngAfterViewInit() {
    if (this.vc) {
      this.logService.log('set focus to last name');
      this.vc.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.contacts = new Array<String>();
    this.contacts.push('', '', '', '');
  }

  ngOnChanges() {
    if (this.domains && this.domains.cities) {
      if (!this.filteredCities) {
        this.filteredCities = this.autoCompleteService.filteredItem$<City>(
          this.domains.cities, this.cityControl, 'cityName');
        this.filteredTitles = this.autoCompleteService.filteredItemAbstract$<Title>(
          this.domains.titles, this.nameAddressForm.controls['title'], 'titleText');
        this.filteredSuffixes = this.autoCompleteService.filteredItemAbstract$<Suffix>(
          this.domains.suffixes, this.nameAddressForm.controls['suffix'], 'suffixText');
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
    if (this.constituent && this.constituent.lastName) {
      this.nameAddressForm.patchValue(this.constituent, { onlySelf: true });
    }
    this.logService.log('ngchanges');
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

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.nameAddressForm);
    return this.nameAddressForm.valid;
  }

  updateConstituentFromForm(constituentToUpdate: Constituent): Constituent {
    const formModel = this.nameAddressForm.value;
    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate, formModel);
    saveConstituent.suffixId = this.autoCompleteService.getIdValue(this.domains.suffixes, saveConstituent.suffix, 'suffixText', 'suffixId');
    return saveConstituent;
  }

}
