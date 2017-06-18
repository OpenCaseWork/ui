import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConstituentComponent } from './constituent.component';
import { NameAddressComponent } from './name-address/name-address.component';
import { HttpService } from '../core/http/http.service';
import { LogService } from '../core/logging/log.service';
import { ConstituentService } from './constituent.service';
import { AutoFocusDirective } from './name-address/autofocus.directive';
import { DemographicsComponent } from './demographics/demographics.component';
import { AppStateService } from '../shared/state/app-state.service';
import { ConstituentAggregateService } from './constitutent-aggregate.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ConstituentComponent,
    NameAddressComponent,
    DemographicsComponent,
    AutoFocusDirective,
  ],
  exports: [
    ConstituentComponent,
    NameAddressComponent,
    DemographicsComponent,
  ],
  providers: [
    HttpService,
    LogService,
    ConstituentService,
    AppStateService,
    ConstituentAggregateService,
  ],
  entryComponents: [
  ]
})
export class ConstituentModule { }
