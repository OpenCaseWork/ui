import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
export class NameAddressComponent implements OnInit, OnChanges {
  @Input() constituent: Constituent;
  @Input() domains: ConstituentDomains;

  nameAddressForm = new FormGroup ({
    lastName: new FormControl()
  });

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
              private validatorService: ValidatorService) {
    this.emailFormControl = this.validatorService.emailFormControl;
  }

  ngOnInit() {
    this.contacts = new Array<String>();
    this.contacts.push('', '', '', '');
  }

  ngOnChanges() {
    if (this.domains && this.domains.cities) {
      this.filteredCities = this.autoCompleteService.filteredItem$<City>(this.domains.cities, this.cityControl, 'cityName');
      this.filteredTitles = this.autoCompleteService.filteredItem$<Title>(this.domains.titles, this.titleControl, 'titleText');
      this.filteredSuffixes = this.autoCompleteService.filteredItem$<Suffix>(this.domains.suffixes, this.suffixControl, 'suffixText');
      this.filteredPostalCodes = this.autoCompleteService.filteredItem$<PostalCode>(this.domains.postalCodes, this.postalControl, 'code');
      this.filteredTownships =
        this.autoCompleteService.filteredItem$<Township>(this.domains.townships, this.townshipControl, 'townshipName');
        this.filteredStates = this.autoCompleteService.filteredItem$<State>(this.domains.states, this.statesControl, 'stateCd');
      this.logService.log('domains loaded');
    } else {
      this.logService.log('empty domains!');
    }
  }

}
