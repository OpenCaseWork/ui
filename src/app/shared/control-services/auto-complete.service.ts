import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, AbstractControl } from '@angular/forms';
import { SelectItem } from '../../models/domains/domains.models';

export const SELECT_DESCRIPTION_FIELD = 'shortDescription';
export const ID_FIELD = 'id';

@Injectable()
export class AutoCompleteService {

  constructor() {
  }

  assignSelectValue(control: SelectItem): number {
    if (control) {
      return control.id;
    } else {
      return 0;
    }
  }

  setSelectValue(patchObject: any, id: number, domainList: Array<SelectItem>, fieldName: string ) {
    patchObject[fieldName] = domainList.find(p => p.id === id);
  }

  getIdValueCustom(array: any[], value: string, valueProperty: string, idProperty: string): number {
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      if (element[valueProperty] === value) {
        return element[idProperty];
      }
    }
    return 0;
  }

  getStringValue(array: any[], value: number): string {
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      if (element[ID_FIELD] === value) {
        return element[SELECT_DESCRIPTION_FIELD];
      }
    }
    return '';
  }

  getIdValue(array: any[], value: string): number {
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      if (element[SELECT_DESCRIPTION_FIELD] === value) {
        return element['id'];
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
