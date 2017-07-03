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
import { ErrorStoreService } from '../state/store-services/error-store.service';
import { constituent } from '../state/reducers/global-selectors';

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
    private errorService: ErrorStoreService,
    private logService: LogService,
    private location: Location) {
    this.constituentAggregate = new ConstituentAggregate();
  }

  ngOnInit() {
    this.logService.log('init constituent component');
    this.loading = true;

    this.domain$ = this.storeService.Domain$()
      .takeUntil(this.ngUnsubscribe);

    this.loadDomains();

    this.constituent$ = this.storeService.ConstituentAggregate$()
      .takeUntil(this.ngUnsubscribe);
      //.subscribe(res => this.setConstituent(res));

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];
        this.loadConstituent();
      });

    //if (this.id > 0) {
    //  this.loadConstituent();
    //}
    this.loading = false;
  }

  loadDomains() {
    this.logService.log('load domains');
    let request = new BaseDomainsRequest();
    request.resource = 'constituents';
    this.storeService.loadDomains(request);
  }

  loadConstituent() {
    console.log('load constituent');
    this.storeService.getConstituent(this.id);
  }

  isLoading(): boolean {
    return this.loading;
  }

  //setConstituent(newConstituent: ConstituentAggregate) {
  //  this.constituentAggregate = newConstituent;
  //  this.fixUrl(newConstituent.constituent.constituentId);
  //}

  fixUrl(id: number) {
    if (id === 0) {
      return;
    }
    let url = this.location.path(false);
    let endSegment = url.substr(url.lastIndexOf('/') + 1);
    if (!Number.isNaN(+endSegment)) {
      this.logService.log('fixing url:' + id);
      url = url.replace(endSegment, String(id));
      this.location.replaceState(url);
    } else {
      this.location.replaceState(url + '/', String(id));
    }
  }

  saveConstituentAggregate() {
    if (!this.nameAddressComponent.isValid()) {
      this.errorService.publishError('Please fix validation errors');
      return;
    }

    let current: ConstituentAggregate;
    this.constituent$.takeLast(1).subscribe(constituent => current = constituent);
    const clone = Object.assign({}, current);
    this.logService.log('before update:' + JSON.stringify(clone.constituent));
    clone.constituent = this.nameAddressComponent.updateConstituentFromForm(clone.constituent);
    this.logService.log('after update:' + JSON.stringify(clone.constituent));
    this.storeService.saveConstituent(clone);
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
