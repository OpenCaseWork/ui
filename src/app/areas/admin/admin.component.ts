import { Component, OnInit } from '@angular/core';
import { ConstituentDomains } from '../../models/constituents/domains/constituents-domains.models';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { Observable } from 'rxjs/Observable';
import { DomainStoreService } from '../../state/store-services/domain-store.service';
import { DomainEnum } from '../../state/resources/resource.service';
import { DomainsState } from '../../state/reducers/domains/domains-reducer';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  domains: ConstituentDomains;
  constituent: ConstituentAggregate;
  private domain$: Observable<ConstituentDomains>;
  private constituent$: Observable<ConstituentAggregate>;

  constructor(private domainStore: DomainStoreService) { }

  ngOnInit() {
    this.domain$ = this.domainStore.Domain$(DomainEnum.Constituent)

    this.domainStore.loadDomains(DomainEnum.Constituent);
      this.domain$.subscribe(res2 => {
        console.log('domains:' + res2.cities.length);
          this.domains = res2;
      });
  }

    select() {
    }
}
