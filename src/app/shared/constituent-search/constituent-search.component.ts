import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { DataTableDemo } from '../material/data-table-demo/data-table-demo';

@Component({
    selector: 'app-constituent-search',
    templateUrl: './constituent-search.component.html',
})
export class ConstituentSearchComponent {
  public title: string; // 'Constituent Search';
  public message: string;
  public lastname: string;
  public firstname: string;

  constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>) {
  }

  search() {
  }
}
