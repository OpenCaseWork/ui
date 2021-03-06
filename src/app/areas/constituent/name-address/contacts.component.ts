import { Component, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef, OnDestroy }                     from '@angular/core';
import { Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup }                    from '@angular/forms';
import { Observable }                                from 'rxjs/Observable';
import { Subject }                                   from 'rxjs/Subject';
import { MdDialog, MdDialogRef }                     from '@angular/material';

import { ConstituentContact }               from '../../../models/constituents/constituents.models';
import { LogService }                       from '../../../core/logging/log.service';
import { ValidatorService }                 from '../../../shared/control-services/validator.service';
import { ConstituentAggregate }             from '../../../models/constituents/constituents-aggregates.models';
import { DomainEnum, ResourceEnum, AppStateEnum } from '../../../state/resources/resource.service';
import { ConstituentDomains, ContactType }  from '../../../models/constituents/domains/constituents-domains.models';
import { DomainStoreService }               from '../../../state/store-services/domain-store.service';
import { ResourceStoreService }             from '../../../state/store-services/resource-store-service';
import { AddContactComponent }              from './add-contact.component';
import { AppStoreService }                  from '../../../state/store-services/app-store.service';


const EMAIL_FIELD = 3;

@Component({
  selector: 'ocw-contacts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnDestroy, OnChanges {
  @Input() domains: ConstituentDomains;
  @Input() constituent: ConstituentAggregate;
  // domains: ConstituentDomains;
  // constituent: ConstituentAggregate;
  contacts: Array<ConstituentContact>;
  loading: boolean;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  dialogRef: MdDialogRef<AddContactComponent>;
  mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  contactsForm: FormGroup;
  group: any = {};


  constructor(
    private logService: LogService,
    private validatorService: ValidatorService,
    private domainStore: DomainStoreService,
    private storeService: ResourceStoreService,
    private cd: ChangeDetectorRef,
    private appStore: AppStoreService,
    public dialog: MdDialog
  ) {
    this.contacts = new Array<ConstituentContact>();
    this.loading = true;
    setTimeout(() => {
      this.loadingDone();
    }, 5000);
    this.logService.log('ContactsComponent.constructor');
  }

  /*ngOnInit() {
    this.logService.log('ContactsComponent:ngOnInit');
    //this.loading = true;
    this.contacts = new Array<ConstituentContact>();

    /*const observables = Observable.combineLatest(
      this.domainStore.Domain$(DomainEnum.Constituent)
        .takeUntil(this.ngUnsubscribe),
      this.storeService.Resource$(ResourceEnum.Constituent)
        .takeUntil(this.ngUnsubscribe)
    );

    const subscriptions = observables
      .timeout(5000)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(results => {
        this.logService.log('ContactsComponent:subscription resolved', results);
        this.domains = <ConstituentDomains>results[0];
        this.constituent = <ConstituentAggregate>results[1];
        this.populateContacts();
        this.setFormGroup();
        this.patchValues();
        this.loading = false;
      }, err => this.handleError()
      );
  }*/

  ngOnChanges() {
    this.logService.log('Contacts NgOnChange', this.domains);
    if (this.domains && this.domains.contactTypes && this.constituent && this.constituent.constituent) {
      this.logService.log('Contacts Domains Loaded!!!!');
      this.populateContacts();
      this.setFormGroup();
      this.patchValues();
      this.loading = false;
      this.cd.markForCheck();
    }
  }

  loadingDone() {
    this.loading = false;
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    this.logService.log('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  populateContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.constituent.contacts));
    let defaults = this.domains.contactTypes.filter(p => p.isDefault === true);
    this.updateLocalContacts(defaults);
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

  private updateLocalContacts(defaults: Array<ContactType>) {
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
  }

  // TODO: figure out pattern for UI-only needed properties
  private setContactUIFields(contact: ConstituentContact, contactType: ContactType) {
    contact.contactTypeId = contactType.id;
    contact.fieldName = contactType.fieldName;
    contact.placeHolder = contactType.placeHolder;
    contact.isPhone = contactType.isPhone;
    contact.uiSequence = contactType.uiSequence;
  }

  patchValues(): void{
    let patchObject = {};
    this.contacts.forEach(element => {
      let contactType = this.domains.contactTypes.find(p => p.id === element.contactTypeId);
      patchObject[contactType.fieldName] = element.contactValue;
    });
    this.logService.log('ContactsComponent: patchvalues:', patchObject);
    this.contactsForm.patchValue(patchObject, { onlySelf: true });

  }

  setFormGroup(): void {
    this.logService.log('ContactsComponent setFormGroup:contacts:', this.contacts);
    this.contacts = this.contacts.sort(function(obj1: ConstituentContact, obj2: ConstituentContact) {
      return obj1.uiSequence - obj2.uiSequence;
    });
    this.contacts.forEach(contact => {
      if (contact.contactTypeId === EMAIL_FIELD) {
        this.group[contact.fieldName] = this.validatorService.createEmailControl(contact.contactValue);
      } else {
        if (contact.isPhone) {
           this.group[contact.fieldName] = this.validatorService.createPhoneControl(contact.contactValue);
        }
      }
    });
    this.logService.log('form GROUP:', this.group);
    this.contactsForm = new FormGroup(this.group);

    /*if (this.contactsForm) {
      this.contactsForm.reset();
    }*/
  }

  isValid(): boolean {
    this.validatorService.triggerFormValidation(this.contactsForm);
    return this.contactsForm.valid;
  }

  /********************************************************************** */
  /* Called from parent form to get list of updated contacts from control
  /*********************************************************************** */
  updateContactsFromForm(): Array<ConstituentContact> {
    const formModel = this.contactsForm.value;
    Object.keys(this.contactsForm.controls).forEach(key => {
      let control = this.contactsForm.get(key);
      let contact = this.contacts.find(p => p.fieldName === key);
      if (contact) {
        contact.contactValue = control.value;
      }
    });
    this.logService.log('ContactComponent: contacts to update:', this.contacts);
    return this.contacts;
  }

  /********************************************************************* */
  /* Called from HTML Template to determine if field has validation error
  /********************************************************************* */
  fieldHasError(fieldName: string): boolean {
    if (this.contactsForm.controls[fieldName].hasError('pattern')) {
      return true;
    } else {
      return false;
    }
  }

  /***************************************************** */
  /* Called from HTML Template to add a new contact type */
  /***************************************************** */
  addContactType() {
    let contactTypeIds = this.contacts.map( p => p.contactTypeId);
    this.appStore.setState(contactTypeIds, AppStateEnum.SelectedContactTypes);
    this.dialogRef = this.dialog.open(AddContactComponent);

    this.dialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        this.logService.log('addContact result', result);
        if (result) {
          this.addNewContact(result);
          this.setFormGroup();
        }
      });
  }

  addNewContact(placeHolder: string) {
    let defaults = this.domains.contactTypes.filter(p => p.placeHolder === placeHolder);
    this.updateLocalContacts(defaults);
    this.logService.log('local contacts count:', this.contacts.length);
    this.cd.markForCheck();
  }
}
