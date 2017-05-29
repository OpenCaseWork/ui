import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSpinner, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConstituentService } from './constituent.service';
import { LogService } from '../core/logging/log.service';
import { Constituent } from '../models/constituents/constituents.models';
import { ConstituentDomains } from '../models/constituents/domains/constituents-domains.models';
import { NameAddressComponent } from './name-address/name-address.component';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {
  @ViewChild(NameAddressComponent)
  private nameAddressComponent: NameAddressComponent;
  domains: ConstituentDomains;
  domain$: Observable<ConstituentDomains>;
  constituent: Constituent;
  private id: number;

  public constructor(private route: ActivatedRoute,
    private service: ConstituentService,
    private logService: LogService,
    public snackBar: MdSnackBar) {
    this.route.params
      .subscribe(params => {
        this.id = +params['id'];
        this.logService.log('id:' + this.id);
      });
    // this.domain$ = this.service.domain$();
  }

  ngOnInit() {
    //this.loadDomains();
    this.loadConstituent();
    this.domain$ = this.service.domain$();
    //this.service.domain$();
    //console.log('domains loaded' + this.service.domains);
  }

  loadDomains() {
    try {
      this.service.domain$()
        .subscribe(
        response => { this.domains = response; this.logService.log('ConstituentComponent loadDomains: ' + JSON.stringify(this.domains)); },
        err => {
          this.logService.log(err);
        });
    } catch (error) {
      this.logService.log('load domains error' + error);
    }
  }

  loadConstituent() {
    if (this.id > 0) {
      try {
        this.service.constituent$(this.id)
          .subscribe(
          response => { this.constituent = response; console.log('returned firstName: ' + this.constituent.firstName); },
          err => {
            this.logService.log(err);
          });
      } catch (error) {
        this.logService.log(error);
      }
    } else {
      this.constituent = new Constituent();
    }
  }

  saveConstituent() {
    try {
      if (!this.nameAddressComponent.isValid()) {
        this.showError();
        return;
      }

      this.logService.log('before update:' + JSON.stringify(this.constituent));
      this.constituent = this.nameAddressComponent.updateConstituentFromForm(this.constituent);
      this.logService.log('after update:' + JSON.stringify(this.constituent));
      this.service.saveConstituent$(this.constituent)
        .subscribe(
        response => { this.constituent = response; console.log('returned id: ' + this.constituent.constituentId); },
        err => {
          this.logService.log(err);
        });
    } catch (error) {
      this.logService.log(error);
    }
  }

  showError() {
    this.logService.log('snackbar');
    let config = new MdSnackBarConfig();
    this.snackBar.open('Please fix validation errors', 'OK', config);
  }

}
