import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('loading constituent');
  }

}
