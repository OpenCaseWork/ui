import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSpinner, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { Constituent } from '../../models/constituents/constituents.models';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { NameAddressComponent } from './name-address/name-address.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { ConstituentStoreService } from '../../state/store-services/constituent-store-service';
import { Subject } from 'rxjs/Subject';
import { ErrorStoreService } from '../../state/store-services/error-store.service';

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
    private storeService: ConstituentStoreService,
    private logService: LogService,
    private errorService: ErrorStoreService,
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
    this.constituent$.subscribe(res => this.setConstituent(res));

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];
        this.loadConstituent();
      });

    this.loading = false;
  }

  loadDomains() {
    this.logService.log('load domains');
    this.storeService.loadDomains();
  }

  loadConstituent() {
    console.log('load constituent');
    this.storeService.getConstituent(this.id);
  }

  isLoading(): boolean {
    return this.loading;
  }

  setConstituent(newConstituent: ConstituentAggregate) {
    this.constituentAggregate = newConstituent;
  }

  saveConstituentAggregate() {
    if (!this.nameAddressComponent.isValid()) {
      this.errorService.publishError('Please fix validation errors');
      return;
    }

    const clone = Object.assign({}, this.constituentAggregate);
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
