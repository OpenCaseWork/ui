import { MdDialogRef, MdSnackBar, MdSnackBarConfig, MdSpinner } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
//import { DataTableDemo } from '../material/data-table-demo/data-table-demo';

import { BaseDataService } from '../data-table/base-data.service';
import { ConstituentSearchService } from './constituent-search.service';
import { SearchTableComponent } from './search-table.component';
import { ConstituentSearchRecord, ConstituentSearchRequest } from '../../models/constituents/search/constituents-search.models';
import { LogService } from '../../core/logging/log.service';

@Component({
  selector: 'app-constituent-search',
  templateUrl: './constituent-search.component.html',
  styleUrls: ['./constituent-search.component.css'],
})
export class ConstituentSearchComponent implements OnInit, OnDestroy {
  @ViewChild(SearchTableComponent)
  private tableComponent: SearchTableComponent;
  public title: string; // 'Constituent Search';
  public message: string;
  public searchRequest: ConstituentSearchRequest;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private records: ConstituentSearchRecord[];
  private searching: boolean;
  public lastName: string;
  public firstName: string;

  constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>,
    private database: BaseDataService<ConstituentSearchRecord>,
    private service: ConstituentSearchService,
    public snackBar: MdSnackBar,
    private logService: LogService) {
  }

  ngOnInit() {
    // this.logService.log('ConstituentSearchComponent.ngOnInit');
  }

  isSearching(): boolean {
    return this.searching;
  }

  search() {
    this.searching = true;
    this.searchRequest = new ConstituentSearchRequest();
    this.searchRequest.firstName = this.firstName;
    this.searchRequest.lastName = this.lastName;
    this.service.searchConstituents(this.searchRequest)
      .finally(() => {
        this.searching = false;
      })
      .subscribe(
        response => this.database.populateData(response.records),
        err => this.showError());
  }

  showError() {
    let config = new MdSnackBarConfig();
    this.snackBar.open('Error searching for Constituent', 'OK', config);
  }

  select() {
    let searchRecord: ConstituentSearchRecord;
    if (this.tableComponent.selection) {
      if (this.tableComponent.selection.hasValue) {
        searchRecord = this.tableComponent.selection.selected[0];
      }
    }
    console.log('selected');
    if (searchRecord) {
      this.logService.log('close with searchrecord');
      this.dialogRef.close(searchRecord);
    }
  }

  cancel() {
    this.database.clearData();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.logService.log('ViewAccountsComponent ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
