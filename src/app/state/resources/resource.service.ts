import { Injectable } from '@angular/core';
import { LogService } from '../../core/logging/log.service';
import { EnvironmentService } from '../../core/environment/environment.service';

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
}

export class ConstituentResources {
  entity: string;
  domains: string;
  search: string;
};

@Injectable()
export class ResourceService {

  private domains: Array<string>;
  private entities: Array<string>;
  private searches: Array<string>;

  constructor(
    protected environmentService: EnvironmentService,
    protected logService: LogService) {
      this.logService.log('ResourceService constructor');
      this.addDomains();
      this.addEntities();
      this.addSearches();
  }

  private addDomains() {
    this.domains = new Array<string>();
    if (this.environmentService.useMockData) {
      this.domains[DomainEnum.Constituent] = 'assets/test-data/constituent-domains.json';
      this.domains[DomainEnum.ContactEvent] = 'assets/test-data/contact-event-domains.json';
    } else {
      this.domains[DomainEnum.Constituent] = 'constituents/domains';
      this.domains[DomainEnum.Constituent] = 'contact-events/domains';
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

  getDomainResource(domainEnum: DomainEnum) {
    return this.domains[domainEnum];
  }

  getEntityResource(entityEnum: ResourceEnum) {
    return this.entities[entityEnum];
  }

  getSearchResource(searchEnum: SearchEnum) {
    return this.searches[searchEnum];
  }

  getResources(): ConstituentResources {
    let resources = new ConstituentResources();
    if (this.environmentService.useMockData) {
        resources.entity = 'assets/test-data/constituent-aggregate.json';
        resources.domains = 'assets/test-data/constituent-domains.json';
        resources.search = 'assets/test-data/constituent-search.json';
    } else {
        resources.entity = 'constituent-aggregates';
        resources.domains = 'constituents/domains';
        resources.search = 'constituents/search';
    }
    return resources;
  }

}
