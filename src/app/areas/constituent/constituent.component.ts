﻿import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSpinner, MdSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { LogService } from '../../core/logging/log.service';
import { Constituent } from '../../models/constituents/constituents.models';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { NameAddressComponent } from './name-address/name-address.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { ConstituentStoreService } from '../../state/store-services/constituent-store-service';
import { StatusStoreService } from '../../state/store-services/status-store.service';
import { DomainStoreService } from '../../state/store-services/domain-store.service';
import { DomainEnum, ResourceEnum } from '../../state/resources/resource.service';
import { ResourceStoreService } from '../../state/store-services/resource-store-service';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit, OnDestroy {
  @ViewChild(NameAddressComponent) private nameAddressComponent: NameAddressComponent;
  @ViewChild(DemographicsComponent) private demographicsComponent: DemographicsComponent;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  domain$: Observable<ConstituentDomains>;
  constituent$: Observable<ConstituentAggregate>;
  constituentAggregate: ConstituentAggregate;
  private id: number;

  public constructor(private route: ActivatedRoute,
    private storeService: ResourceStoreService,
    private domainStore: DomainStoreService,
    private logService: LogService,
    private statusService: StatusStoreService,
    private location: Location) {
    this.constituentAggregate = new ConstituentAggregate();
  }

  ngOnInit() {
    this.logService.log('init constituent component');

    this.domain$ = this.domainStore.Domain$(DomainEnum.Constituent)
      .takeUntil(this.ngUnsubscribe);
    this.domainStore.loadDomains(DomainEnum.Constituent);

    this.constituent$ = this.storeService.Resources$(ResourceEnum.Constituent)
      .takeUntil(this.ngUnsubscribe);
    this.constituent$.subscribe(res => this.setConstituent(res));

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];
        this.storeService.getResource(this.id, ResourceEnum.Constituent);
      });
  }

  // TODO: remove, seems unnecessary now using async and store?
  isLoading(): boolean {
    return false;
  }

  setConstituent(newConstituent: ConstituentAggregate) {
    this.constituentAggregate = newConstituent;
  }

  saveConstituentAggregate() {
    if (!this.nameAddressComponent.isValid()) {
      this.statusService.publishError('Please fix validation errors');
      return;
    }

    const clone = Object.assign({}, this.constituentAggregate);
    this.logService.log('before update:' + JSON.stringify(clone.constituent));
    clone.constituent = this.nameAddressComponent.updateConstituentFromForm(clone.constituent);
    this.logService.log('after update:' + JSON.stringify(clone.constituent));
    this.storeService.saveResource(clone, ResourceEnum.Constituent);
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
