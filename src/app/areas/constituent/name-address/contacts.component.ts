import { Component, OnInit, Input, OnChanges,
        ViewChild, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,
          Validators, AbstractControl}                                        from '@angular/forms';
import { Observable }                                                         from 'rxjs/Observable';
import { Subject }                                                            from 'rxjs/Subject';

import { ConstituentContact } from '../../../models/constituents/constituents.models';
import { LogService } from '../../../core/logging/log.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { DomainEnum, ResourceEnum } from '../../../state/resources/resource.service';
import { ConstituentDomains, ContactType } from '../../../models/constituents/domains/constituents-domains.models';
import { DomainStoreService } from '../../../state/store-services/domain-store.service';
import { ResourceStoreService } from '../../../state/store-services/resource-store-service';
import { BaseEffect } from '../../../state/effects/base-effect';
import { BaseEntity } from '../../../core/models/request-response.models';
import { BaseDomains } from '../../../models/domains/domains.models';

const EMAIL_FIELD = 3;

@Component({
  selector: 'ocw-contacts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {
  //@Input() constituent: ConstituentAggregate;
  //@Input() domains: ConstituentDomains;
  domains: ConstituentDomains;
  constituent: ConstituentAggregate;
  private contacts: Array<ConstituentContact>;
  private loading: boolean;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  public mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  contactsForm: FormGroup;
  emailFormControl: AbstractControl;
  homePhoneControl: AbstractControl;


  constructor(
    private logService: LogService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private domainStore: DomainStoreService,
    private storeService: ResourceStoreService,
    private cd: ChangeDetectorRef
  ) {
    this.contacts = new Array<ConstituentContact>();
    this.logService.log('ContactsComponent.constructor');
  }

  ngOnInit() {
    this.logService.log('ContactsComponent:ngOnInit');
    this.loading = true;
    this.contacts = new Array<ConstituentContact>();

    const observables = Observable.combineLatest(
      this.domainStore.Domain$(DomainEnum.Constituent)
        .takeUntil(this.ngUnsubscribe),
      this.storeService.Resource$(ResourceEnum.Constituent)
        .takeUntil(this.ngUnsubscribe)
    );

    const subscriptions = observables.subscribe(results => {
      this.logService.log('ContactsComponent:subscription resolved', results);
      this.domains = <ConstituentDomains> results[0];
      this.constituent = <ConstituentAggregate> results[1];
      this.populateContacts();
      this.createFormGroup();
      this.patchValues();
      this.loading = false;
    });
  }

  populateContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.constituent.contacts));
    let defaults = this.domains.contactTypes.filter(p => p.isDefault === true);
    defaults.forEach(contactType => {
      let contact = this.contacts.find(p => p.contactTypeId === contactType.id);
      if (!contact) {
        contact = new ConstituentContact();
        this.setContactUIFields(contact, contactType);
        this.contacts.push(contact);
      } else {
        this.setContactUIFields(contact, contactType);
      }
    });
    let contactsToPopulate = this.contacts.filter(p => !p.fieldName);
    contactsToPopulate.forEach(emptyContact => {
      let contactType = this.domains.contactTypes.find(p => p.id === emptyContact.contactTypeId);
      if (contactType) {
        this.setContactUIFields(emptyContact, contactType);
      }
    });
    this.logService.log('local contacts count:', this.contacts.length);
    this.cd.markForCheck();
  }

  private setContactUIFields(contact: ConstituentContact, contactType: ContactType) {
    contact.contactTypeId = contactType.id;
    contact['fieldName'] = contactType.fieldName;
    contact['placeHolder'] = contactType.placeHolder;
    contact['isPhone'] = contactType.isPhone;
    contact['uiSequence'] = contactType.uiSequence;
  }

  ngOnChanges() {
    this.logService.log('ContactsComponent.ngOnChanges');
  }

  patchValues() {
    let patchObject = {};
    this.contacts.forEach(element => {
      let contactType = this.domains.contactTypes.find(p => p.id === element.contactTypeId);
      patchObject[contactType.fieldName] = element.contactValue;
    });
    this.logService.log('ContactsComponent: patchvalues:', patchObject);
    this.contactsForm.patchValue(patchObject, { onlySelf: true });

  }

  createFormGroup() {
    let group: any = {};

    this.logService.log('ContactsComponent createFormGroup:contacts:', this.contacts);
    this.contacts = this.contacts.sort(function(obj1: ConstituentContact, obj2: ConstituentContact) {
      return obj1['uiSequence'] - obj2['uiSequence'];
    });
    this.contacts.forEach(contact => {
      if (contact.contactTypeId === EMAIL_FIELD) {
        group[contact['fieldName']] = this.validatorService.createEmailControl(contact.contactValue);
      } else {
        if (contact['isPhone']) {
           group[contact['fieldName']] = this.validatorService.createPhoneControl(contact.contactValue);
        }// else {
        //   group[contact['fieldName']] = new FormControl(contact.contactValue || '');
        //}
      }
    });
    this.logService.log('form GROUP:', group);
    this.contactsForm = new FormGroup(group);

    if (this.contactsForm) {
      this.contactsForm.reset();
    }
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.contactsForm);
    return this.contactsForm.valid;
  }

  updateContactsFromForm(): Array<ConstituentContact> {
    const formModel = this.contactsForm.value;
    //let  contactsToUpdate = new Array<ConstituentContact>();

    Object.keys(this.contactsForm.controls).forEach(key => {
      let control = this.contactsForm.get(key);
      let contact = this.contacts.find(p => p['fieldName'] === key);
      if (contact) {
        contact.contactValue = control.value;
        //let contactToUpdate = contactsToUpdate.find(p => p.contactTypeId === contact.contactTypeId)
        //if (contactToUpdate) {
        //  contactToUpdate.contactValue = contact.contactValue;
        //} else {
        //contactsToUpdate.push(contact);
        //}
      }
    });
    this.logService.log('ContactComponent: contacts to update:', this.contacts);
    return this.contacts;
  }

}
