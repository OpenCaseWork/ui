import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'app-constituent-search',
    templateUrl: './constituent-search.component.html',
})
export class ConstituentSearchComponent {

    public title: string; // 'Constituent Search';
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConstituentSearchComponent>) {

    }
}