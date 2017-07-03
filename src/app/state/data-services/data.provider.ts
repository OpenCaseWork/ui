// import { PlatformRef } from '@angular/core';
// import { Router }              from '@angular/router';
import { HttpService } from '../../core/http/http.service';
import { LogService } from '../../core/logging/log.service';
import { EnvironmentService } from '../../core/environment.service';
import { BaseDataService } from './base-data.service';
// import { MockViewAccountsDataService } from './mocks/mock-view-accounts-data.service';
import { MockConstituentDataService } from './constituent/mock-constituent-data.service';

/* Constituent SERVICE PROVIDER */
export function BaseDataServiceFactory(
  httpService: HttpService,
  logService: LogService,
  environmentService: EnvironmentService) {
  // Return mock when mock option is specified
  if (environmentService.useMockData === true) {
    return new MockConstituentDataService(httpService, logService);
  } else {
    return new BaseDataService(httpService, logService);
  }
};

export let BaseDataServiceProvider = {
  provide: BaseDataService,
  useFactory: BaseDataServiceFactory,
  deps: [HttpService, LogService, EnvironmentService]
};

