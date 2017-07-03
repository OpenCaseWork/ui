import { Injectable } from '@angular/core';
import { LogService } from '../../core/logging/log.service';
import { EnvironmentService } from '../../core/environment.service';

export class ConstituentResources {
  entity: string;
  domains: string;
  search: string;
};

@Injectable()
export class ConstituentResourcesService {

  constructor(
    protected environmentService: EnvironmentService,
    protected logService: LogService) {
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
