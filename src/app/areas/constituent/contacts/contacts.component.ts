import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { LogService } from '../../../core/logging/log.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { ConstituentContact } from '../../../models/constituents/constituents.models';
import { ConstituentDomains } from '../../../models/constituents/domains/constituents-domains.models';

const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// tslint:disable-next-line:max-line-length
const EMAIL_REGEX2: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX: RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  /* styleUrls: ['./demographics.component.css'] */
})
export class ContactsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() constituent: ConstituentAggregate;
  @Input() domains: ConstituentDomains;

  contactsForm: FormGroup;
  contacts: ConstituentContact[];

  homePhoneControl: AbstractControl;
  cellPhoneControl: AbstractControl;
  businessPhoneControl: AbstractControl;
  emailControl: AbstractControl;

  constructor(private logService: LogService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder) {

    this.contacts = this.constituent.contacts;
    this.contactsForm = this.createFormGroup();
  }

  createFormGroup() {
    let group: any = {};
    for (let contactType of this.domains.contactTypes) {
      if (contactType.isDefault) {
        if (contactType.isPhone) {
          group[contactType.description] = new FormControl('', Validators.pattern(PHONE_REGEX));
        } else {
          group[contactType.description] = new FormControl('', Validators.pattern(EMAIL_REGEX2));
        }
        let contact = this.contacts.find(p => p.contactTypeId === contactType.id);
        if (!contact) {
          contact = new ConstituentContact();
          contact.contactTypeId = contactType.id;
          this.contacts.push(contact);
        }
        contact['key'] = contactType.description;
      } else {
        let contact = this.contacts.find(p => p.contactTypeId === contactType.id);
        contact['key'] = contactType.description;
        if (contact) {
          if (contactType.isPhone) {
            group[contactType.description] = new FormControl('', Validators.pattern(PHONE_REGEX));
          } else {
            group[contactType.description] = new FormControl('');
          }
        }
      }
    }
    return new FormGroup(group);
  }

  addControl(): FormControl {
    return new FormControl('', [Validators.pattern(EMAIL_REGEX)]);
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
