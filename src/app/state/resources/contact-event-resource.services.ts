import { Injectable } from '@angular/core';
import { LogService } from '../../core/logging/log.service';
import { EnvironmentService } from '../../core/environment/environment.service';
import { BaseResourceService, BaseResources } from './base-resource.service';


@Injectable()
export class ContactEventResourcesService implements BaseResourceService {

  constructor(
    protected environmentService: EnvironmentService,
    protected logService: LogService) {
  }

  getResources(): BaseResources {
    let resources = new BaseResources();
    if (this.environmentService.useMockData) {
        resources.entity = 'assets/test-data/contact-event-aggregate.json';
        resources.domains = 'assets/test-data/contact-event-domains.json';
        resources.search = 'assets/test-data/contact-event-search.json';
    } else {
        resources.entity = 'contact-event-aggregates';
        resources.domains = 'contact-events/domains';
        resources.search = 'contact-events/search';
    }
    return resources;
  }

}
