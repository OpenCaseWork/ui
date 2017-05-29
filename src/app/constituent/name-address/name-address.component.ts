import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Constituent } from '../../models/constituents/constituents.models';
import { ConstituentDomains, City, Suffix,
        Title, PostalCode, Township, State } from '../../models/constituents/domains/constituents-domains.models';
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
  public contacts: Array<String>;

  filteredCities: Observable<City[]>;
  filteredSuffixes: Observable<Suffix[]>;
  filteredTitles: Observable<Title[]>;
  filteredPostalCodes: Observable<PostalCode[]>;
  filteredTownships: Observable<Township[]>;
  filteredStates: Observable<State[]>;

  cityControl = new FormControl();
  suffixControl = new FormControl();
  titleControl = new FormControl();
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
  }

  ngAfterViewInit() {
      if (this.vc) {
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
        this.filteredCities = this.autoCompleteService.filteredItem$<City>(this.domains.cities, this.cityControl, 'cityName');
        this.filteredTitles = this.autoCompleteService.filteredItem$<Title>(this.domains.titles, this.titleControl, 'titleText');
        this.filteredSuffixes = this.autoCompleteService.filteredItem$<Suffix>(this.domains.suffixes, this.suffixControl, 'suffixText');
        this.filteredPostalCodes = this.autoCompleteService.filteredItem$<PostalCode>(this.domains.postalCodes, this.postalControl, 'code');
        this.filteredTownships =
          this.autoCompleteService.filteredItem$<Township>(this.domains.townships, this.townshipControl, 'townshipName');
          this.filteredStates = this.autoCompleteService.filteredItem$<State>(this.domains.states, this.statesControl, 'stateCd');
        this.logService.log('domains loaded');
      }
    } else {
      this.logService.log('empty domains!');
    }

    // populate form, but only if have populated constituent
    if (this.constituent && this.constituent.lastName) {
      this.nameAddressForm.patchValue(this.constituent, {onlySelf: true});
    }
    this.logService.log('ngchanges');
  }

  createForm() {
    this.nameAddressForm = this.formBuilder.group({
      lastName: ['', Validators.required ],
      firstName: ['', Validators.required ],
      federalId: ['', Validators.pattern(this.validatorService.ssnRegex())], // new FormControl(),
      middleName: '', // new FormControl(),
      nickName: '', // new FormControl(),
      maidenName: '' // new FormControl()
    });
  }

  isValid(): boolean {
    this.nameAddressForm.markAsTouched();
    this.nameAddressForm.markAsDirty();
    this.logService.log('name address is valid:' + this.nameAddressForm.valid);
    return this.nameAddressForm.valid;
  }

  /*onSubmit() {
    this.constituent = this.prepareSaveHero();
    // this.heroService.updateHero(this.hero).subscribe(/* error handling );
    // this.ngOnChanges();
    } */

  updateConstituentFromForm(constituentToUpdate: Constituent): Constituent {
    const formModel = this.nameAddressForm.value;

    // deep copy of form model lairs
    // const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
    //  (address: Address) => Object.assign({}, address)
    // );

    const saveConstituent: Constituent = Object.assign({}, constituentToUpdate, formModel);
    return saveConstituent;
  }

}
