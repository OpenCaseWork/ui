import { Component, ChangeDetectorRef, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SelectionModel, MdSort, MdPaginator } from '@angular/material';
import { BaseDataTableService } from '../data-table/base-data-table.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';

import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { GenericDatabase, ExampleDataSource } from '../data-table/generic-data-source';
import { SearchEnum } from '../../state/resources/resource.service';
import { SearchStoreService } from '../../state/store-services/search-store-service';
import { Constituent } from '../../models/constituents/constituents.models';

@Component({
  moduleId: module.id,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-constituent-search-table',
  templateUrl: 'search-table.component.html',
  styleUrls: ['search-table.component.css'],
})
export class SearchTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  exampleDatabase = new GenericDatabase(0, this.searchStore );
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<ConstituentSearchRecord>(false, null, true);
  displayedColumns = ['checkbox', 'Id', 'LastName', 'FirstName', 'Phone', 'BirthDate', 'City', 'Address', 'ECCPIS'];

  constructor(private _peopleDatabase: BaseDataTableService<ConstituentSearchRecord>,
              private searchStore: SearchStoreService,
              private _changeDetectorRef: ChangeDetectorRef) {
    // _changeDetectorRef.detectChanges()
    // this.selection.selected()
  }

  formatDate(date: Date): string {
    let datePipe = new DatePipe('US-en');
    return datePipe.transform(date, 'MM/dd/yyyy');
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator);
  }

  ngOnDestroy() {
    this.exampleDatabase.unsubscribe();
  }


  getOpacity(progress: number) {
    let distanceFromMiddle = Math.abs(50 - progress);
    return distanceFromMiddle / 50 + .3;
  }


}
