import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DomainStoreService } from '../../../state/store-services/domain-store.service';
import { DomainEnum } from '../../../state/resources/resource.service';
import { SelectItem } from '../../../models/domains/domains.models';
import { ContactType, ConstituentDomains } from '../../../models/constituents/domains/constituents-domains.models';

import { LogService } from '../../../core/logging/log.service';
import { AutoCompleteService, SELECT_DESCRIPTION_FIELD } from '../../../shared/control-services/auto-complete.service';
import { ValidatorService } from '../../../shared/control-services/validator.service';
import { MdDialogRef } from '@angular/material';

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
        if (!this.filteredContactTypes) {
          this.filteredContactTypes = this.autoCompleteService.filteredItem$<ContactType>(
          this.domains.contactTypes, this.contactTypeControl, 'description');
          this.logService.log('domains loaded');
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
