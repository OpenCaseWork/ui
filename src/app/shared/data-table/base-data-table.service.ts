import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import { LogService } from '../../core/logging/log.service';

@Injectable()
export class BaseDataTableService<T> {
  baseData: T[] = [];
  baseDataChange = new BehaviorSubject<void>(null);

  constructor(private logService: LogService) {
  }

  // Was used to autopopulate
  /*fillData(createRecord: Function) {
    for (let i = 0; i < 100; i++) {
      this.addRecord(createRecord());
    }
  }*/

  /** clear the base array list, and then populate with records passed in */
  populateData(records: T[]) {
    this.logService.log('records:' + records.length);
    this.baseData = [];
    this.clearData();
    for (let i = 0; i < records.length; i++) {
      this.addRecord(records[i]);
    }
    this.triggerUpdate();
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
  }

  remove(selected: T[]) {
    this.baseData = this.baseData.filter(data => selected.indexOf(data) == -1);
    this.baseDataChange.next(null);
  }

}
