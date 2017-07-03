import {
  MdDialogRef,
  MdSpinner
} from '@angular/material';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { BaseDataTableService } from '../data-table/base-data-table.service';
import { ConstituentSearchService } from './constituent-search.service';
import { SearchTableComponent } from './search-table.component';
import { ConstituentSearchRecord, ConstituentSearchRequest } from '../../models/constituents/search/constituents-search.models';
import { LogService } from '../../core/logging/log.service';
import { Observable } from 'rxjs/observable';
import { ConstituentStoreService } from '../../state/store-services/constituent-store-service';

@Component({
  selector: 'app-constituent-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './constituent-search.component.html',
  styleUrls: ['./constituent-search.component.css'],
})
export class ConstituentSearchComponent implements OnInit, OnDestroy {
  @ViewChild(SearchTableComponent) private tableComponent: SearchTableComponent;
  public searchRequest: ConstituentSearchRequest;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private searching = false;
  public lastName: string;
  public firstName: string;

  constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>,
    private database: BaseDataTableService<ConstituentSearchRecord>,
    private service: ConstituentSearchService,
    private logService: LogService,
    private cd: ChangeDetectorRef,
    private constituentStoreService: ConstituentStoreService) {
  }

  ngOnInit() {
    this.logService.log('ConstituentSearchComponent.ngOnInit');

    // Subscribe to loading
    this.constituentStoreService.SearchLoading$()
      .startWith(false)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => this.setSearching(res));

    // Subscribe to constituents search list
    this.constituentStoreService.SearchConstituent$()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(response => {
        if (response) {
          this.database.populateData(response);
          this.logService.log('search complete!');
        }
      });
  }

  private setSearching(val: boolean) {
    this.logService.log('searching set to ' + val);
    this.searching = val;
    this.cd.markForCheck();
  }

  isSearching(): boolean {
    return this.searching;
  }

  search() {
    this.searchRequest = new ConstituentSearchRequest();
    this.searchRequest.firstName = this.firstName;
    this.searchRequest.lastName = this.lastName;
    this.logService.log('searching!');
    this.constituentStoreService.searchConstituents(this.searchRequest);
  }

  select() {
    let searchRecord: ConstituentSearchRecord;
    if (this.tableComponent.selection) {
      if (this.tableComponent.selection.hasValue) {
        searchRecord = this.tableComponent.selection.selected[0];
      }
    }
    this.logService.log('selected');
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
