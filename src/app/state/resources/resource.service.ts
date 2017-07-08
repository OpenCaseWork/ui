import { Injectable } from '@angular/core';

import { LogService }           from '../../core/logging/log.service';
import { EnvironmentService }   from '../../core/environment/environment.service';
import { RouteUrlDashboard }    from '../../app-routing.urls';
import { RouteUrlConstituent }  from '../../areas/dashboard/dashboard-routing.urls';
import { ResourceEffects } from '../effects/resource-effects';
import { ConstituentAggregate } from '../../models/constituents/constituents-aggregates.models';
import { BaseEntity } from '../../core/models/request-response.models';
import { ContactEventDomains } from '../../models/contact-events/domains/contact-event-domains.models';
import { ContactType } from '../../models/constituents/domains/constituents-domains.models';

export enum DomainEnum {
  Constituent = 0,
  ContactEvent = 1
}

export enum ResourceEnum {
  Constituent = 0,
  ContactEvent = 1
}

export enum SearchEnum {
  Constituent = 0,
  ContactEvent = 1,
}

export enum AppStateEnum {
  SelectedContactTypes = 0
}

@Injectable()
export class ResourceService {

  private domains: Array<string>;
  private entities: Array<string>;
  private searches: Array<string>;
  private resourceUrls: Array<string>;

  constructor(
    protected environmentService: EnvironmentService,
    protected logService: LogService) {
      this.logService.log('ResourceService constructor');
      this.addDomains();
      this.addEntities();
      this.addSearches();
      this.addResourceUrls();
  }

  private addResourceUrls() {
    this.resourceUrls = new Array<string>();
    this.resourceUrls[ResourceEnum.Constituent] = RouteUrlDashboard() + '/' + RouteUrlConstituent();
  }

  private addDomains() {
    this.domains = new Array<string>();
    if (this.environmentService.useMockData) {
      this.domains[DomainEnum.Constituent] = 'assets/test-data/constituent-domains.json';
      this.domains[DomainEnum.ContactEvent] = 'assets/test-data/contact-event-domains.json';
    } else {
      this.domains[DomainEnum.Constituent] = 'constituents/domains';
      this.domains[DomainEnum.ContactEvent] = 'contact-events/domains';
    }
  }

  private addEntities() {
    this.entities = new Array<string>();
    if (this.environmentService.useMockData) {
      this.entities[ResourceEnum.Constituent] = 'assets/test-data/constituent-aggregate.json';
    } else {
      this.entities[ResourceEnum.Constituent] = 'constituent-aggregates';
    }
  }

  private addSearches() {
    this.searches = new Array<string>();
    if (this.environmentService.useMockData) {
      this.searches[SearchEnum.Constituent] = 'assets/test-data/constituent-search.json';
    } else {
      this.searches[SearchEnum.Constituent] = 'constituents/search';
    }
  }

  getNewResource(entityEnum: ResourceEnum): BaseEntity {
    let entity: BaseEntity;
    switch (entityEnum) {
      case ResourceEnum.Constituent:
        entity = new ConstituentAggregate();
        break;
      case ResourceEnum.ContactEvent:
        break;
    }
    return entity;
  }

  getNewState(stateEnum: AppStateEnum): BaseEntity {
    let entity: BaseEntity;
    switch (stateEnum) {
      case AppStateEnum.SelectedContactTypes:
        entity = new Array<ContactType>();
        break;
    }
    return entity;
  }

  getDomainResource(domainEnum: DomainEnum) {
    return this.domains[domainEnum];
  }

  getEntityResource(entityEnum: ResourceEnum) {
    return this.entities[entityEnum];
  }

  getSearchResource(searchEnum: SearchEnum) {
    return this.searches[searchEnum];
  }

  getResourceUrls(resourceEnum: ResourceEnum) {
    return this.resourceUrls[resourceEnum];
  }

}
