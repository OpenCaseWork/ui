import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/material';
import { BaseDataTableService } from '../data-table/base-data-table.service';
import { GenericDataSource } from '../data-table/generic-data-source';
import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';

@Component({
  moduleId: module.id,
  selector: 'app-constituent-search-table',
  templateUrl: 'search-table.component.html',
  styleUrls: ['search-table.component.css'],
})
export class SearchTableComponent implements OnInit {
  dataSource: GenericDataSource<ConstituentSearchRecord>;
  selection = new SelectionModel<ConstituentSearchRecord>(false, null, true);
  propertiesToDisplay = ['checkbox', 'Id', 'LastName', 'FirstName', 'Phone', 'BirthDate', 'City', 'Address', 'ECCPIS'];
  colToPropMap: { [key: string]: string; } = {
      'Id': 'id',
      'LastName': 'lastName',
      'FirstName': 'firstName',
      'Phone': 'phone',
      'BirthDate': 'birthDate',
      'City': 'city',
      'Address': 'address',
      'ECCPIS' : 'eCCPIS'
    };

  constructor(private _peopleDatabase: BaseDataTableService<ConstituentSearchRecord>,
              private _changeDetectorRef: ChangeDetectorRef) {
    // _changeDetectorRef.detectChanges()
    // this.selection.selected()
  }

  ngOnInit() {
    this.dataSource = new GenericDataSource<ConstituentSearchRecord>(this._peopleDatabase, this.colToPropMap);
  }


  getOpacity(progress: number) {
    let distanceFromMiddle = Math.abs(50 - progress);
    return distanceFromMiddle / 50 + .3;
  }


}
