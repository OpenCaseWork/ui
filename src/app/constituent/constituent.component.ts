import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSpinner, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../core/logging/log.service';
import { Constituent } from '../models/constituents/constituents.models';
import { ConstituentDomains } from '../models/constituents/domains/constituents-domains.models';
import { NameAddressComponent } from './name-address/name-address.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { ConstituentAggregateService } from './constitutent-aggregate.service';
import { ConstituentAggregate } from '../models/constituents/constituents-aggregates.models';
import { RouteUrlConstituent } from '../dashboard/dashboard-routing.urls';
import { RouteUrlDashboard } from '../app-routing.urls';
import { ConstituentStoreService } from '../state/store-services/constituent-store-service';
import { Subject } from 'rxjs/Subject';
import { EntityRequest } from '../models/root.models';
import { BaseDomainsRequest } from '../models/base/base.models';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit, OnDestroy {
  @ViewChild(NameAddressComponent) private nameAddressComponent: NameAddressComponent;
  @ViewChild(DemographicsComponent) private demographicsComponent: DemographicsComponent;
  domain$: Observable<ConstituentDomains>;
  constituent$: Observable<ConstituentAggregate>;
  constituentAggregate: ConstituentAggregate;
  private id: number;
  private loading: boolean;
  private domains: ConstituentDomains;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  public constructor(private route: ActivatedRoute,
    private aggregateService: ConstituentAggregateService,
    private storeService: ConstituentStoreService,
    private logService: LogService,
    private location: Location) {
  }

  ngOnInit() {
    this.logService.log('init constituent component');
    this.loading = true;
    this.domain$ = this.storeService.Domain$()
      .takeUntil(this.ngUnsubscribe);

    this.loadDomains();

    this.constituent$ = this.storeService.ConstituentAggregate$();
      this.constituent$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => this.constituentAggregate = res);

    this.route.params
      .subscribe(params => {
        this.id = +params['id'];
        this.loadConstituent2();
      });

    if (this.id > 0) {
      this.loadConstituent2();
    }
    /*} else {
      this.constituent$ = Observable.of(new ConstituentAggregate())
        .takeUntil(this.ngUnsubscribe);
    }*/
    this.loading = false;
  }

  loadDomains() {
    this.logService.log('load domains');
    let request = new BaseDomainsRequest();
    request.resource = 'constituents';
    this.storeService.loadDomains(request);
  }

  loadConstituent2() {
    console.log('load constituent');
    this.storeService.getConstituent(this.id);
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
        this.constituent$ = Observable.of(this.constituentAggregate);
      });
  }

  showError() {
    this.logService.log('snackbar');
    //let config = new MdSnackBarConfig();
    //this.snackBar.open('Please fix validation errors', 'OK', config);
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
