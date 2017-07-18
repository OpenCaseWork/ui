import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort, MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';

import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { LogService } from '../../core/logging/log.service';
import { SearchEnum } from '../../state/resources/resource.service';
import { SearchStoreService } from '../../state/store-services/search-store-service';

export interface PaginationData {
  index: number;
  pageLength: number;
}


  function nullsToBottom(a, b) {
    return a === b ? 0 : a === null ? 1 : -1;
  }

  function comparison(a, b) {
    let propertyA: number|string = '';
    let propertyB: number|string = '';

    let key = (this._sort.active);
    let value = this._colToPropMap[key];
    [propertyA, propertyB] = [a[value], b[value]];

    let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  }

  function withComparators(...comparators: any[]) {

    return function (a, b) {
        let len = comparators.length, i = 0, result;

        for (; i < len; i++) {
            result = comparators[i](a, b);
            if (result) {
              return result;
            }
        }

        return 0;
    };

  }


export class GenericDatabase {
  subscription: Subscription;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor() {}

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addEntity(entity: any) {
    const copiedData = this.data.slice();
    copiedData.push(entity);
    this.dataChange.next(copiedData);
  }

  populateData(records: any[]) {
    console.log('populate table data:', records);
    if (records) {
      this.clearData();
      for (let i = 0; i < records.length; i++) {
        this.addEntity(records[i]);
      }
    }
  }

  clearData() {
    const copiedData = this.data.slice();
    copiedData.length = 0;
    this.dataChange.next(copiedData);
  }
}

export class ExampleDataSource extends DataSource<any> {

  constructor(private _exampleDatabase: GenericDatabase,
     private _sort: MdSort,
     private _paginator: MdPaginator,
     private _colToPropMap: any) {
    super();
  }

  disconnect() {}

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.mdSortChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(): any[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort(withComparators(nullsToBottom, comparison));
  }


}
