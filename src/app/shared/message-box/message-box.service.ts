import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { MessageBoxComponent } from './message-box.component';

@Injectable()
export class MessageBoxService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<MessageBoxComponent>;

        dialogRef = this.dialog.open(MessageBoxComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}