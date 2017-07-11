import {
  Component, OnInit, Input, OnChanges, AfterViewInit,
  ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
  FormControl, FormGroup, FormBuilder,
  Validators, AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Constituent, ConstituentContact } from '../../../models/constituents/constituents.models';
import {
  ConstituentDomains, City, Suffix,
  Title, PostalCode, Township, State
} from '../../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { SelectItem } from '../../../models/domains/domains.models';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { ContactsComponent } from './contacts.component';

@Component({
  selector: 'app-name-address',
  // changeDetection: ChangeDetectionStrategy.OnPush, TODO: turn on if change detect issue fixed with autocomplete 
  templateUrl: './name-address.component.html',
  styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges {
  @ViewChild(ContactsComponent) private contactsComponent: ContactsComponent;
  @Input() constituent: ConstituentAggregate;
  @Input() domains: ConstituentDomains;
  nameAddressForm: FormGroup;
  filteredCities: Observable<SelectItem[]>;
  filteredSuffixes: Observable<SelectItem[]>;
  filteredTitles: Observable<SelectItem[]>;
  filteredPostalCodes: Observable<SelectItem[]>;
  filteredTownships: Observable<SelectItem[]>;
  filteredStates: Observable<SelectItem[]>;
  mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // control references for validation
  federalId: AbstractControl;

  constructor(
    private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.createForm();
    this.federalId = this.nameAddressForm.controls['federalId'];
    console.log('NameAddressComponent.constructor');
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.nameAddressForm.reset();
    if (this.domains && this.domains.cities) {
      if (!this.filteredCities) {
        this.filteredCities = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.cities, this.nameAddressForm.controls['city'], SELECT_DESCRIPTION_FIELD);
        this.filteredTitles = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.titles, this.nameAddressForm.controls['title'], SELECT_DESCRIPTION_FIELD);
        this.filteredSuffixes = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.suffixes, this.nameAddressForm.controls['suffix'], SELECT_DESCRIPTION_FIELD);
        this.filteredPostalCodes = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.postalCodes,  this.nameAddressForm.controls['postal'], SELECT_DESCRIPTION_FIELD);
        this.filteredTownships = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.townships, this.nameAddressForm.controls['township'], SELECT_DESCRIPTION_FIELD);
        this.filteredStates = this.autoCompleteService.filteredItemAbstract$<SelectItem>(
          this.domains.states, this.nameAddressForm.controls['state'], SELECT_DESCRIPTION_FIELD);
        this.logService.log('domains loaded');
      }
    } else {
      this.logService.log('empty domains!');
    }

    // populate form, but only if have populated constituent
    if (this.constituent && this.constituent.constituent) {
      this.logService.log('constituent patch object', this.constituent.constituent);
      let patchObject = Object.assign({}, this.constituent.constituent);

      this.setSelectValue(patchObject, patchObject.suffixId, this.domains.suffixes, 'suffix');
      this.setSelectValue(patchObject, patchObject.titleId, this.domains.titles, 'title');
      this.setSelectValue(patchObject, patchObject.postalCodeId, this.domains.postalCodes, 'postal');
      this.setSelectValue(patchObject, patchObject.cityId, this.domains.cities, 'city');
      this.setSelectValue(patchObject, patchObject.townshipId, this.domains.townships, 'township');
      this.setSelectValue(patchObject, patchObject.stateId, this.domains.states, 'state');

      this.logService.log('patch object', patchObject);
      this.nameAddressForm.patchValue(patchObject, { onlySelf: true });
    } else {
      this.logService.log('empty constituent!');
    }
    this.logService.log('NameAddressComponent.ngOnChanges');
  }

  setSelectValue(patchObject: any, id: number, domainList: Array<SelectItem>, fieldName: string ) {
    patchObject[fieldName] = domainList.find(p => p.id === id);
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
      suffix: '',
      city: '',
      postal: '',
      state: '',
      township: ''

    });
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.nameAddressForm);
    return this.nameAddressForm.valid && this.contactsComponent.isValid();
  }

  updateConstituentFromForm(constituentToUpdate: ConstituentAggregate): ConstituentAggregate {
    const formModel = this.nameAddressForm.value;
    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate.constituent, formModel);
    saveConstituent.suffixId = this.assignValue(saveConstituent['suffix']);
    saveConstituent.titleId = this.assignValue(saveConstituent['title']);
    saveConstituent.postalCodeId = this.assignValue(saveConstituent['postal']);
    saveConstituent.cityId = this.assignValue(saveConstituent['city']);
    saveConstituent.townshipId = this.assignValue(saveConstituent['township']);
    saveConstituent.stateId = this.assignValue(saveConstituent['state']);
    constituentToUpdate.constituent = saveConstituent;
    return constituentToUpdate;
  }


  assignValue(control: SelectItem): number {
    if (control) {
      return control.id;
    } else {
      return 0;
    }
  }

  updateContactsFromForm(): Array<ConstituentContact> {
      return this.contactsComponent.updateContactsFromForm();
  }

  displaySelectValue(selected: SelectItem): any {
    console.log('selected:', selected);
    return selected ? selected.shortDescription : selected;
    //if (selected) {
    //  return selected.shortDescription;
    //}
  }

}
