import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConstituentComponent } from './constituent.component';
import { NameAddressComponent } from './name-address/name-address.component';
import { HttpService } from '../core/http/http.service';
import { LogService } from '../core/logging/log.service';
import { ConstituentService } from './constituent.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ConstituentComponent,
    NameAddressComponent,
  ],
  exports: [
    ConstituentComponent,
    NameAddressComponent,
  ],
  providers: [
    HttpService,
    LogService,
    ConstituentService
  ],
  entryComponents: [
  ]
})
export class ConstituentModule { }
