import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SessionService } from '../../core/session/session.service';
import { IdleService } from '../../core/session/idle.service';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { LogService } from '../../core/logging/log.service';
import { StatusStoreService } from '../../state/store-services/status-store.service';
import { ResponseStatus } from '../../core/models/request-response.models';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomainStoreService } from '../../state/store-services/domain-store.service';
import { DomainEnum } from '../../state/resources/resource.service';
import { ContactEventDomains } from '../../models/contact-events/domains/contact-event-domains.models';
import { DomainsState } from '../../state/reducers/domains/domains-reducer';

@Component({
  selector: 'ocw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constituentDomain$: Observable<ConstituentDomains>;
  contactEventDomain$: Observable<ConstituentDomains>;
  status$: Observable<ResponseStatus>;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
    private sessionService: SessionService,
    private idleService: IdleService,
    private statusStore: StatusStoreService,
    private domainsStore: DomainStoreService,
    private logService: LogService,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.idleService.reset();

    // errors
    this.status$ = this.statusStore.Status$()
      .takeUntil(this.ngUnsubscribe);
    this.status$
      .subscribe(res => this.displayStatus(res));

    // domains
    this.constituentDomain$ = this.domainsStore.Domain$(DomainEnum.Constituent)
      .takeUntil(this.ngUnsubscribe);

    this.contactEventDomain$ = this.domainsStore.Domain$(DomainEnum.ContactEvent)
      .takeUntil(this.ngUnsubscribe);

    this.domainsStore.loadDomains(DomainEnum.Constituent);
    this.domainsStore.loadDomains(DomainEnum.ContactEvent);
  }

  private displayStatus(status: ResponseStatus) {
    if (status) {
      this.logService.log('displayStatus called: errorId' + status.errorEnumId);
      let config = new MdSnackBarConfig();
      if (status.errorEnumId === 0 || status.errorEnumId === undefined) {
        config.duration = 1000;
        this.snackBar.open(status.message, null, config);
      } else {
        this.snackBar.open(status.message, 'OK', config);
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
