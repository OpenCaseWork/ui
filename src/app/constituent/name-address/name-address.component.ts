import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Constituent } from '../models/constituent';

@Component({
    selector: 'app-name-address',
    templateUrl: './name-address.component.html',
    styleUrls: ['./name-address.component.css']
})
export class NameAddressComponent implements OnInit, OnChanges {
    @Input() constituent: Constituent;
    constructor() { }

    ngOnInit() {
        //console.log ('passed on constituent' + JSON.stringify(this.constituent));
    }

    ngOnChanges() {
        console.log ('passed on constituent' + JSON.stringify(this.constituent));
    }
}
