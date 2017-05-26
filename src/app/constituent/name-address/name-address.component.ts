import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Constituent } from '../models/constituent';
import { ConstituentDomains, City, Suffix, Title } from '../models/constituent-domains';
import { SelectItem } from '../../shared/domains/models/select-item';
import { LogService } from '../../core/logging/log.service';

@Component({
  selector: 'app-name-address',
  templateUrl: './name-address.component.html',
  styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges {
  @Input() constituent: Constituent;
  @Input() domains: ConstituentDomains;

  filteredOptions: Observable<City[]>;
  filteredSuffixes: Observable<Suffix[]>;
  filteredTitles: Observable<Title[]>;

  myControl = new FormControl();
  suffixControl = new FormControl();
  titleControl = new FormControl();

  constructor(private logService: LogService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.domains && this.domains.cities) {
      this.filteredOptions = this.filteredItem$<City>(this.domains.cities, this.myControl, 'cityName');
      this.filteredTitles = this.filteredItem$<Title>(this.domains.titles, this.titleControl, 'titleText');
      this.filteredSuffixes = this.filteredItem$<Suffix>(this.domains.suffixes, this.suffixControl, 'suffixText');
      this.logService.log('domains loaded');
    } else {
      this.logService.log('empty domains!');
    }
    // if (this.domains && this.domains.cities) {
    //  this.filteredOptions = this.myControl.valueChanges
    //    .startWith(null)
    //    .map(city => city && typeof city === 'object' ? city.cityName : city)
    //    .map(cityName => cityName ? this.filter(cityName) : this.domains.cities.slice());
    // }
  }

  // filter(name: string): City[] {
  //  return this.domains.cities.filter(option => new RegExp(`^${name}`, 'gi').test(option.cityName));
  // }

  filteredItem$<T>(list: T[], control: FormControl, propertyName: string ): Observable<T[]> {
    let filteredItems: Observable<T[]>;
     if (list) {
       filteredItems = control.valueChanges
        .startWith(null)
        .map(item => item && typeof item === 'object' ? item[propertyName] : item)
        .map(value => value ? this.filterGeneric<T>(list, value, propertyName) : list.slice());
    }
    return filteredItems;
  }

  filterGeneric<T>(list: T[], value: string, propertyName: string): T[] {
    return list.filter(option => new RegExp(`^${value}`, 'gi').test(option[propertyName]));
  }

  // displayGeneric<T>(item: T, propertyName: string) {
  //  return item ? item[propertyName] : '';
  // }

  displayCity(city: City): string {
    return city ? city.cityName : '';
  }

  displaySuffix(suffix: Suffix): string {
    return suffix ? suffix.suffixText : '';
  }

  displayTitle(title: Title): string {
    return title ? title.titleText : '';
  }
}
