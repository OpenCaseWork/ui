import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { Constituent } from '../../models/constituents/constituents.models';
import { LogService } from '../../core/logging/log.service';
import { ValidatorService } from '../../shared/control-services/validator.service';
import { Contact } from '../../models/contacts/contacts.models';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  /* styleUrls: ['./demographics.component.css'] */
})
export class ContactsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() constituent: Constituent;

  constructor(private logService: LogService,
    private validatorService: ValidatorService,
    private formBuilder: FormBuilder) {
  }

  ngAfterViewInit() {
   }

  ngOnInit() {
  }

  ngOnChanges() {
  }
  
}
