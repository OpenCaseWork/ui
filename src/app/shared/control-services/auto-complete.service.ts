import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

@Injectable()
export class AutoCompleteService {

  constructor() {
  }

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
}
