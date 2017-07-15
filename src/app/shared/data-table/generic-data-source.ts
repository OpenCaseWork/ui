import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort, MdPaginator } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';

import {BaseDataTableService} from './base-data-table.service';
import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { LogService } from '../../core/logging/log.service';
import { SearchEnum } from '../../state/resources/resource.service';
import { SearchStoreService } from '../../state/store-services/search-store-service';
import { Subscription } from 'rxjs/Subscription';


export interface PaginationData {
  index: number;
  pageLength: number;
}

export class GenericDatabase {
  subscription: Subscription;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(private searchEnum: SearchEnum,
    private searchStore: SearchStoreService) {
 
   // Subscribe to constituents search list
    this.subscription = this.searchStore.Searche$(SearchEnum.Constituent)
      .subscribe(response => {
        if (response) {
          this.populateData(response);
          console.log('search complete!');
        }
      });

  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  addEntity(entity: any) {
    const copiedData = this.data.slice();
    copiedData.push(entity);
    this.dataChange.next(copiedData);
  }

  populateData(records: any[]) {
    //this.logService.log('records:' + records.length);
    this.clearData();
    for (let i = 0; i < records.length; i++) {
      this.addEntity(records[i]);
    }
    //this.triggerUpdate();
  }

  clearData() {
    const copiedData = this.data.slice();
    copiedData.length = 0;
    this.dataChange.next(copiedData);
  }

}


export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: GenericDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
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
      //const data = this._exampleDatabase.data.slice();
      const data = this.getSortedData();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);

      //return this.getSortedData();
    });
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(): any[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
        case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
