import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class BaseDataService<T> {
  baseData: T[] = [];
  baseDataChange = new BehaviorSubject<void>(null);

  constructor() {
  }

  fillData(createRecord: Function) {
    for (let i = 0; i < 100; i++) {
      this.addRecord(createRecord());
    }
  }

  populateData(records: T[]) {
    for (let i = 0; i < records.length; i++) {
      this.addRecord(records[i]);
    }
  }

  clearData() {
    this.baseData.length = 0;
  }

  getData(filter: Function): Observable<T[]> {
    return new Observable(observer => {
      if (!filter) {
        observer.next(this.baseData.slice());
        return;
      }

      let filteredData = this.baseData.filter((item: T) => {
        filter(item);
      });

      observer.next(filteredData);
    });
  }

  triggerUpdate() {
    this.baseDataChange.next(null);
  }

  addRecord(record: T) {
    this.baseData.push(record);
    this.baseDataChange.next(null);
    console.log(this.baseData.length);
    console.log('record added');
  }

  remove(selected: T[]) {
    this.baseData = this.baseData.filter(data => selected.indexOf(data) == -1);
    this.baseDataChange.next(null);
  }

}
