import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'app-message-box',
    templateUrl: 'message-box.component.html',
    styleUrls: ['message-box.component.css']
})
export class MessageBoxComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<MessageBoxComponent>) {

    }
}
