import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../core/logging/log.service';
import { HttpService } from '../../core/http/http.service';
import { ConstituentContact } from '../../models/constituents/constituents.models';

@Injectable()
export class ContactService {

  constructor(
    private HttpService: HttpService,
    private logService: LogService
    ) {
  }

 saveContacts$(contact: ConstituentContact): Observable<ConstituentContact> {
    let body = JSON.stringify(contact);
    this.logService.log('ConstituentService.saveConstituent:' + body);

    return Observable.create((observer) => {
      this.HttpService.post('contacts/', body)
        .subscribe(
        response => {
          observer.next(response.json());
        },
        error => {
          this.logService.log(error);
        },
        () => { observer.complete(); console.log('ConstituentService.saveConstituent onComplete'); }
      );
    });
  }

  contact$(Id: number): Observable<ConstituentContact> {
    this.logService.log('ConstituentService.getConstituent');

    return Observable.create((observer) => {
    this.HttpService.get('contacts/' + Id)
      .subscribe(
        response => {
          observer.next(response.json());
        },
        error => {
          this.logService.log(error);
        },
        () => { observer.complete(); console.log('ConstituentService.getConstituent onComplete'); }
      );
    });
  }
}
