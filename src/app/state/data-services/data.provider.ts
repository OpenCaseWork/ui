// import { PlatformRef } from '@angular/core';
// import { Router }              from '@angular/router';
import { HttpService } from '../../core/http/http.service';
import { LogService } from '../../core/logging/log.service';
import { EnvironmentService } from '../../core/environment.service';
import { ConstituentDataService } from './constituent/constituent-data.service';
// import { MockViewAccountsDataService } from './mocks/mock-view-accounts-data.service';

/* Constituent SERVICE PROVIDER */
export function ConstituentDataServiceFactory(
  httpService: HttpService,
  logService: LogService,
  environmentService: EnvironmentService) {
  // Return mock when mock option is specified
  if (environmentService.useMockData === true) {
    return new ConstituentDataService(httpService, logService);
  } else {
    return new ConstituentDataService(httpService, logService);
  }
};

export let ConstituentDataServiceProvider = {
  provide: ConstituentDataService,
  useFactory: ConstituentDataServiceFactory,
  deps: [HttpService, LogService, EnvironmentService]
};

