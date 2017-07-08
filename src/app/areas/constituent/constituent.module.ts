import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule }                 from '@angular/flex-layout';
import { TextMaskModule }                   from 'angular2-text-mask';

import { CustomMaterialModule }   from '../../shared/custom-material.module';
import { ConstituentComponent }   from './constituent.component';
import { NameAddressComponent }   from './name-address/name-address.component';
import { HttpService }            from '../../core/http/http.service';
import { LogService }             from '../../core/logging/log.service';
import { AutoFocusDirective }     from './name-address/autofocus.directive';
import { DemographicsComponent }  from './demographics/demographics.component';
import { ContactsComponent } from './name-address/contacts.component';
import { AddContactComponent } from './name-address/add-contact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    TextMaskModule,
  ],
  declarations: [
    ConstituentComponent,
    NameAddressComponent,
    DemographicsComponent,
    AutoFocusDirective,
    ContactsComponent,
    AddContactComponent,
  ],
  exports: [
    ConstituentComponent,
    NameAddressComponent,
    DemographicsComponent,
    ContactsComponent,
  ],
  providers: [
    HttpService,
    LogService,
  ],
  entryComponents: [
    AddContactComponent
  ]
})
export class ConstituentModule { }
