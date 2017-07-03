﻿import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../core/session/session.service';
import { IdleService } from '../../core/session/idle.service';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { ConstituentStoreService } from '../../state/store-services/constituent-store-service';
import { Subject } from 'rxjs/Subject';
import { LogService } from '../../core/logging/log.service';
import { ErrorStoreService } from '../../state/store-services/error-store.service';
import { ResponseStatus } from '../../core/models/request-response.models';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constituentDomain$: Observable<ConstituentDomains>;
  error$: Observable<ResponseStatus>;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
    private sessionService: SessionService,
    private idleService: IdleService,
    private storeService: ConstituentStoreService,
    private errorStore: ErrorStoreService,
    private logService: LogService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.idleService.reset();

    // errors
    this.error$ = this.errorStore.Error$()
      .takeUntil(this.ngUnsubscribe);
    this.error$
      .subscribe(res => this.handleError(res));

    // domains
    this.constituentDomain$ = this.storeService.Domain$()
      .takeUntil(this.ngUnsubscribe);
    this.storeService.loadDomains();
  }

  private handleError(error: ResponseStatus) {
    if (error) {
      this.logService.log('handleError called' + error);
      let config = new MdSnackBarConfig();
      if (error.errorEnumId === 0) {
        config.duration = 1000;
        this.snackBar.open(error.message, null, config);
      } else {
        this.snackBar.open(error.message, 'OK', config);
      }
    }
  }

  logout() {
    this.sessionService.logout();
    this.idleService.stop();
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
