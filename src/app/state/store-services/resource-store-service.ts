import { Injectable } from '@angular/core';
import { LogService } from './../../core/logging/log.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as GlobalReducer from '../reducers/global-reducer';
import * as ResourceActions from './../actions/resource-actions';
import { BaseStoreService } from './../../core/state/store-services/base-store.service';
import { BasePostRequest, EntityRequest, BaseEntity } from '../../core/models/request-response.models';
import { ResourceService, ResourceEnum } from '../resources/resource.service';

// Wrapper service of the State in the Store
@Injectable()
export class ResourceStoreService extends BaseStoreService {

  constructor(
    private logService: LogService,
    private store: Store<GlobalReducer.GlobalState>,
    private resourceService: ResourceService) {
      super();
    }

   Resource$(resourceEnum: ResourceEnum): Observable<BaseEntity> {
    this.logService.log(this.getClassName() + ':Resource$');
    let getResource = (globalState: GlobalReducer.GlobalState) => globalState.resourceState.resources[resourceEnum].results;
    return this.store.select(getResource)
      .filter(p => p !== undefined);
  }

  // Load using API if not already loaded into the Store
  getResource(id: number, resourceEnum: ResourceEnum): void {
    let state: BaseEntity;
    if (Number.isNaN(id) || id <= 0) {
      this.logService.log(this.getClassName() + ':dispatch NewAction');
      this.store.dispatch(new ResourceActions.NewAction(this.resourceService.getNewResource(resourceEnum), resourceEnum));
      return;
    }
    let request = new EntityRequest();
    request.id = id;
    request.resource = this.resourceService.getEntityResource(resourceEnum);
    this.logService.log(this.getClassName() + ':start getResource:', request);
    // Synchronously check if loaded
    // Emit only the first 1 value emmited by the source Observable
    /*this.store.select(GlobalSelectors.constituent)
      .filter(agg => agg.constituent.constituentId === request.id)
      .take(1).subscribe(s => state = s);
    this.logService.log(this.getClassName() + ':isLoaded for ' + request);*/
    // If Account is not loaded, load Account using API
    if (!state) {
      this.logService.log(this.getClassName() + ':dispatch GetAction');
      this.store.dispatch(new ResourceActions.GetAction(request, resourceEnum));
    } else {
      this.logService.log(this.getClassName() + ':already loaded');
    }
  }

  saveResource(resource: BaseEntity, resourceEnum: ResourceEnum): void {
    let request = new BasePostRequest<BaseEntity>();
    request.data = resource;
    request.resource = this.resourceService.getEntityResource(resourceEnum);
    request.successMessage = 'Resource saved';
    this.logService.log(this.getClassName() + ':start saveResource:', request.data);
    this.store.dispatch(new ResourceActions.SaveAction(request, resourceEnum));
  }

   newResource(resourceEnum: ResourceEnum): void {
    let state: BaseEntity;
    this.logService.log(this.getClassName() + ':dispatch NewAction');
    this.store.dispatch(new ResourceActions.NewAction(this.resourceService.getNewResource(resourceEnum), resourceEnum));
  }

}
