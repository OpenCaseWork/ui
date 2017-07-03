import { HttpService } from '../../http/http.service';
import { LogService } from '../../logging/log.service';
import { EnvironmentService } from '../../environment/environment.service';
import { BaseDataService } from './base-data.service';
import { MockBaseDataService } from './mock-base-data.service';

/* Constituent SERVICE PROVIDER */
export function BaseDataServiceFactory(
  httpService: HttpService,
  logService: LogService,
  environmentService: EnvironmentService) {
  // Return mock when mock option is specified
  if (environmentService.useMockData === true) {
    return new MockBaseDataService(httpService, logService);
  } else {
    return new BaseDataService(httpService, logService);
  }
};

export let BaseDataServiceProvider = {
  provide: BaseDataService,
  useFactory: BaseDataServiceFactory,
  deps: [HttpService, LogService, EnvironmentService]
};

