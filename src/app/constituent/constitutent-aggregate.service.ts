import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../core/logging/log.service';
import { HttpService } from '../core/http/http.service';
import { ConstituentAggregate } from '../models/constituents/constituents-aggregates.models';
import { AppStateService } from '../shared/state/app-state.service';

@Injectable()
export class ConstituentAggregateService {
  instance: Function = this.constructor;

  constructor(
    private HttpService: HttpService,
    private logService: LogService,
    private appStateService: AppStateService,
    ) {
  }

  // experimenting with decorator for logging method info
  /* logMethod(target, key, descriptor) {
    // save a reference to the original method this way we keep the values currently in the
    // descriptor and don't overwrite what another decorator might have done to the descriptor.
    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    let originalMethod = descriptor.value;
    // editing the descriptor/value parameter
    descriptor.value = function () {
        let args = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        let a = args.map(function (a) { return JSON.stringify(a); }).join();
        // note usage of originalMethod here
        let result = originalMethod.apply(this, args);
        let r = JSON.stringify(result);
        console.log('Call: ' + key + '(' + a + ') => ' + r);
        return result;
    };

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
  }

  @this.logMethod
  test() {

  }*/

  saveConstituent$(constituent: ConstituentAggregate): Observable<ConstituentAggregate> {
    let body = JSON.stringify(constituent);
    this.logService.log(this.instance.name + this.saveConstituent$.name + ':' + body);

    return this.HttpService.post('constituent-aggregates/', body)
      .map(response => response.json()).share();
  }

  constituent$(Id: number): Observable<ConstituentAggregate> {
    this.logService.log(this.instance.name + '.getConstituent:' + Id);
    return this.HttpService.get('constituent-aggregates/' + Id)
      .map(response => response.json()).share();
  }
}
