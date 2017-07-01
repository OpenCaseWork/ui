import { Observable } from 'rxjs/Rx';
import { ConstituentSearchComponent } from './constituent-search.component';
import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, Directive } from '@angular/core';

@Injectable()
export class ConstituentSearchDialogService {
  dialogRef: MdDialogRef<ConstituentSearchComponent> | null;
  lastResult: ConstituentSearchRecord;

  constructor(private dialog: MdDialog) { }

  // note: can pass in arguments here, like title: string
  public search(): Observable<ConstituentSearchRecord> {

    //this.dialogRef = MdDialogRef<ConstituentSearchComponent>;
    this.dialogRef = this.dialog.open(ConstituentSearchComponent);

    // if you needed to set variable on the component
    // dialogRef.componentInstance.title = title;

    this.dialogRef.afterClosed().subscribe(( result: ConstituentSearchRecord ) => {
      this.lastResult = result;
      this.dialogRef = null;
    });

    return Observable.of(this.lastResult);
  }
}
