import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ConstituentStoreService } from '../../../state/store-services/constituent-store-service';
import { TransferStoreService } from '../../../state/store-services/transfer-store.services';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app works!';
  invert = false;
  selected = '';
  private loaded$: Observable<boolean>;
  private constituentsLoaded$: Observable<boolean>;

  constructor(private constituentStoreService: ConstituentStoreService,
              private transferStoreService: TransferStoreService,
              public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.loaded$ = this.transferStoreService.Loaded$();
    this.constituentsLoaded$ = this.constituentStoreService.Loaded$();
    this.loaded$.subscribe( res => console.log('loaded:' + res));
    this.constituentsLoaded$.subscribe( res => console.log('constituents loaded:' + res));
  }

  select() {
    this.snackBar.open('test');
  }
}
