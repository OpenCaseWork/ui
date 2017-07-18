import { Component, ChangeDetectorRef, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { SelectionModel, MdSort, MdPaginator } from '@angular/material';
import { BaseDataTableService } from '../data-table/base-data-table.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';

import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { GenericDatabase, ExampleDataSource } from '../data-table/generic-data-source';
import { SearchEnum } from '../../state/resources/resource.service';
import { SearchStoreService } from '../../state/store-services/search-store-service';
import { Constituent } from '../../models/constituents/constituents.models';
import { LogService } from '../../core/logging/log.service';

export class ColumnDefinition {
  cdkColumnDef: string;
  cdkHeaderCellDef: string;
  fieldName: string;
  dataType: string;
}

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ocw-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() columns: ColumnDefinition[];
  @Input() checkbox: boolean;
  @Input() data: any[];
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  selection = new SelectionModel<any>(false, null, true);
  displayedColumns: string[];
  colToPropMap = {};
  exampleDatabase: GenericDatabase;
  dataSource: ExampleDataSource | null;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private logService: LogService) {
    // this.selection.selected()
    this.logService.log('DataTableComponent.constructor:');
    this.exampleDatabase = new GenericDatabase();

  }

  populateData(input: any[]) {
    this.exampleDatabase.populateData(input);
  }

  formatDate(date: Date): string {
    let datePipe = new DatePipe('US-en');
    return datePipe.transform(date, 'MM/dd/yyyy');
  }

  ngOnChanges() {
    this.exampleDatabase.populateData(this.data);
  }

  ngOnInit() {
    if (this.checkbox) {
      this.displayedColumns = ['checkbox'];
    }
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(p => p.cdkColumnDef));

    this.columns.forEach(element => {
      if (element.fieldName.length > 0) {
        this.colToPropMap[element.cdkColumnDef] = element.fieldName;
      }
    });

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator, this.colToPropMap);
    //this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.exampleDatabase.unsubscribe();
  }

}
