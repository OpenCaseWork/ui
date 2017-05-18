import { Observable } from 'rxjs/Rx';
import { ConstituentSearchComponent } from './constituent-search.component';
import { ConstituentSearchRecord } from './constituent-search.models';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstituentSearchDialogService {

  constructor(private dialog: MdDialog) { }

  // note: can pass in arguments here, like title: string
  public search(): Observable<ConstituentSearchRecord> {

    let dialogRef: MdDialogRef<ConstituentSearchComponent>;
    dialogRef = this.dialog.open(ConstituentSearchComponent);

    // if you needed to set variable on the component
    // dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }
}
