import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DomainStoreService } from '../../../state/store-services/domain-store.service';
import { DomainEnum, AppStateEnum } from '../../../state/resources/resource.service';
import { SelectItem } from '../../../models/domains/domains.models';
import { ContactType, ConstituentDomains } from '../../../models/constituents/domains/constituents-domains.models';

import { LogService } from '../../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { MdDialogRef } from '@angular/material';
import { AppStoreService } from '../../../state/store-services/app-store.service';
import { ConstituentContact } from '../../../models/constituents/constituents.models';

@Component({
  selector: 'ocw-add-contact',
  templateUrl: './add-contact.component.html'
})
export class AddContactComponent implements OnInit, OnChanges {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  domains: ConstituentDomains;
  filteredContactTypes: Observable<ContactType[]>;
  contactTypeControl = new FormControl();
  contactTypeForm: FormGroup;

  constructor(private domainStore: DomainStoreService,
    private appStore: AppStoreService,
    private logService: LogService,
    private autoCompleteService: AutoCompleteService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialogRef: MdDialogRef<AddContactComponent>) {
    this.createForm();
  }

  ngOnInit() {
    this.domainStore.Domain$(DomainEnum.Constituent)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.domains = <ConstituentDomains> res;
        let availableContactTypes = <ContactType[]> JSON.parse(JSON.stringify(this.domains.contactTypes));
        this.logService.log('availablecontacttypes:' , availableContactTypes);
        this.appStore.AppState$(AppStateEnum.SelectedContactTypes)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(selectedContactTypeIds => {
              this.logService.log('selectedContactTypeIds:' , selectedContactTypeIds);
              let contactTypeIds = <Array<number>> selectedContactTypeIds;
              contactTypeIds.forEach(element => {
                this.logService.log('element:' + element);
                let index = availableContactTypes.findIndex( p => p.id === element);
                if (index >= 0) {
                  this.logService.log('index:' + index);
                  availableContactTypes.splice(index, 1);
                  this.logService.log('availableContactTypes:' + JSON.stringify(availableContactTypes));
                }
              });
          });
        if (!this.filteredContactTypes) {
          this.logService.log('availableContactTypes', availableContactTypes);
          this.filteredContactTypes = this.autoCompleteService.filteredItem$<ContactType>(
          availableContactTypes, this.contactTypeControl, 'description');
          this.logService.log('filteredContactTypes loaded');
        }
        this.logService.log('contacttypes:', this.filteredContactTypes);
      });
  }

  ngOnChanges() {
    this.logService.log('NameAddressComponent.ngOnChanges');
  }

  select(): void {
    if (this.contactTypeControl.value) {
      //this.autoCompleteService.getStringValue(this.domains.suffixes, this.constituent.constituent.suffixId);
      console.log('selected value:', this.contactTypeControl.value);
      this.dialogRef.close(this.contactTypeControl.value);
    }
  }

  createForm() {
    this.contactTypeForm = this.formBuilder.group({
      contactType: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.logService.log('AddContact form:', this.contactTypeForm)
  }

  cancel() {
    this.dialogRef.close();
  }
}
