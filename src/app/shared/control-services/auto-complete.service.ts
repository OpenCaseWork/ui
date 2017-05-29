import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable()
export class AutoCompleteService {

  constructor() {
  }

  getIdValue(array: any[], value: string, valueProperty: string, idProperty: string): number {
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      if (element[valueProperty] === value) {
        return element[idProperty];
      }
    }
    return 0;
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

  filteredItemAbstract$<T>(list: T[], control: AbstractControl, propertyName: string ): Observable<T[]> {
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
