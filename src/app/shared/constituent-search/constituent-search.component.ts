import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { DataTableDemo } from '../material/data-table-demo/data-table-demo';
import { ConstituentSearchRecord } from './constituent-search-record';
import { BaseDataService } from '../data-table/base-data.service';

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
export class ConstituentSearchComponent {
  public title: string; // 'Constituent Search';
  public message: string;
  public lastname: string;
  public firstname: string;

  constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>, private database: BaseDataService<ConstituentSearchRecord>) {
  }

  search() {
    let list: ConstituentSearchRecord[] = [];
    for (let i = 0; i < 100; i++) {
      list.push(createRecord());
    }
    this.database.populateData(list);
  }

  cancel() {
    this.database.clearData();
    this.dialogRef.close();
  }
}
