import { MdDialogRef } from '@angular/material';
import { Component,
        OnInit,
        OnDestroy,
        ViewChild } from '@angular/core';
import { DataTableDemo } from '../material/data-table-demo/data-table-demo';
import { ConstituentSearchRecord,
        ConstituentSearchRequest,
        ConstituentSearchResponse } from './constituent-search.models';
import { BaseDataService } from '../data-table/base-data.service';
import { ConstituentSearchService } from './constituent-search.service';
import { SearchTableComponent } from './search-table.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

function createRecord(): ConstituentSearchRecord {
   let record = new ConstituentSearchRecord();
   record.address = '89 Constituent Rd';
   record.id = 1;
   record.name = 'Joe';
   record.phone = '888-111-1111';
   record.city = 'Lake Zurich';
   record.state = 'IL';
   return record;
}

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
  public lastname: string;
  public firstname: string;
  public searchRequest: ConstituentSearchRequest;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private records: ConstituentSearchRecord[];

  constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>,
              private database: BaseDataService<ConstituentSearchRecord>,
              private service: ConstituentSearchService) {
  }

  ngOnInit() {
    // this.logService.log('ConstituentSearchComponent.ngOnInit');
  }

  search() {
    try {
      this.service.searchConstituents(this.searchRequest)
        .subscribe(
          response => this.database.populateData(response.records),
            err => {
              // Log errors if any
              console.log(err);
            });
    } catch (error) {
      console.log(error);
    }
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
      console.log('close with searchrecord');
      this.dialogRef.close(searchRecord);
    }
  }

  cancel() {
    this.database.clearData();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    console.log('ViewAccountsComponent ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
