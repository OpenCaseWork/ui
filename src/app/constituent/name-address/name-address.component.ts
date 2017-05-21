import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs/observable';
import { Constituent } from '../models/constituent';
import { ConstituentDomains, City } from '../models/constituent-domains';
import { SelectItem } from '../../shared/domains/models/select-item';

@Component({
    selector: 'app-name-address',
    templateUrl: './name-address.component.html',
    styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges {
    @Input() constituent: Constituent;
    @Input() domains: ConstituentDomains;
    filteredOptions: Observable<City[]>;
    myControl = new FormControl();

    constructor() { }


    ngOnInit() {

      console.log('Name/Address ngOnInit domains:' + JSON.stringify(this.domains));
    }

    ngOnChanges() {
      this.filteredOptions = this.myControl.valueChanges
         .startWith(null)
         .map(city => city && typeof city === 'object' ? city.cityName : city)
         .map(cityName => cityName ? this.filter(cityName) : this.domains.cities.slice());
        console.log ('passed in constituent' + JSON.stringify(this.constituent));
        console.log('Name/Address ngOnChanges domains:' + JSON.stringify(this.domains));
    }

     filter(name: string): City[] {
      return this.domains.cities.filter(option => new RegExp(`^${name}`, 'gi').test(option.cityName));
   }

   displayFn(city: City): string {
      return city ? city.cityName : '';
   }
}
