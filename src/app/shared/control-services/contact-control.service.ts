import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConstituentContact} from '../../models/constituents/constituents.models';

@Injectable()
export class ContactControlService {
  constructor() { }

  toFormGroup(contacts: ConstituentContact[] ) {
    let group: any = {};

    contacts.forEach(contact => {
      group[contact.contactTypeId] = new FormControl(contact.contactValue || '', Validators.required);
    });
    return new FormGroup(group);
  }
}