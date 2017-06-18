import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSpinner, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConstituentService } from './constituent.service';
import { LogService } from '../core/logging/log.service';
import { Constituent } from '../models/constituents/constituents.models';
import { ConstituentDomains } from '../models/constituents/domains/constituents-domains.models';
import { NameAddressComponent } from './name-address/name-address.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { ConstituentAggregateService } from './constitutent-aggregate.service';
import { ConstituentAggregate } from '../models/constituents/constituents-aggregates.models';
import { RouteUrlConstituent } from '../dashboard/dashboard-routing.urls';
import { RouteUrlDashboard } from '../app-routing.urls';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {
  @ViewChild(NameAddressComponent) private nameAddressComponent: NameAddressComponent;
  @ViewChild(DemographicsComponent) private demographicsComponent: DemographicsComponent;
  domain$: Observable<ConstituentDomains>;
  constituent$: Observable<ConstituentAggregate>;
  constituentAggregate: ConstituentAggregate;
  private id: number;
  private loading: boolean;

  public constructor(private route: ActivatedRoute,
    private service: ConstituentService,
    private aggregateService: ConstituentAggregateService,
    private logService: LogService,
    private location: Location,
    public snackBar: MdSnackBar) {
    this.route.params
      .subscribe(params => {
        this.id = +params['id'];
        this.logService.log('id:' + this.id);
      });
    this.constituentAggregate = new ConstituentAggregate;
  }

  ngOnInit() {
    this.loading = true;
    this.domain$ = this.service.domain$();
    if (this.id > 0) {
      this.constituent$ = this.aggregateService.constituent$(this.id);
      this.constituent$.subscribe(
      (response) => {
        this.constituentAggregate = response;
        this.logService.log('constituent loaded')
      },
        error => this.handleServerError(error));
    } else {
      this.constituent$ = Observable.of(new ConstituentAggregate());
    }
    this.loading = false;
  }

  private handleServerError(error: Response) {
    this.logService.log('handleServerError called' + error);
    let config = new MdSnackBarConfig();
    this.snackBar.open('Data access error', 'OK', config);
  }

  isLoading(): boolean {
    return this.loading;
  }

  saveConstituentAggregate() {
    let isNew = false;
    if (!this.nameAddressComponent.isValid()) {
      this.showError();
      return;
    }

    if (!this.constituentAggregate.constituent) {
      isNew = true;
    }
    this.logService.log('before update:' + JSON.stringify(this.constituentAggregate.constituent));
    this.constituentAggregate.constituent = this.nameAddressComponent.updateConstituentFromForm(this.constituentAggregate.constituent);
    this.logService.log('after update:' + JSON.stringify(this.constituentAggregate.constituent));
    this.constituent$ = this.aggregateService.saveConstituent$(this.constituentAggregate);
    this.constituent$.subscribe(
      (response) => {
        this.constituentAggregate = response;
        if (isNew) {
          this.logService.log('current path = ' + this.location.path(false));
          this.location.replaceState(this.location.path(false) + '/' + String(this.constituentAggregate.constituent.constituentId));
        }
        this.logService.log('constituent loaded')
      },
      error => {
        this.handleServerError(error);
        this.constituent$ = Observable.of(this.constituentAggregate);
      });
  }

  showError() {
    this.logService.log('snackbar');
    let config = new MdSnackBarConfig();
    this.snackBar.open('Please fix validation errors', 'OK', config);
  }

}
