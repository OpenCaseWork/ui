import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from './custom-material.module';

import { ConstituentSearchComponent } from './constituent-search/constituent-search.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message-box.service';
import { NotFoundComponent } from './not-found.component';
import { BaseDataTableService } from './data-table/base-data-table.service';
import { SearchTableComponent } from './constituent-search/search-table.component';
import { HttpService } from '../core/http/http.service';
import { HttpHeaderService } from '../core/http/http-header.service';
import { AutoCompleteService } from './control-services/auto-complete.service';
import { ValidatorService } from './control-services/validator.service';
import { ContactControlService } from './control-services/contact-control.service';
import { GenericDatabase } from './data-table/generic-data-source';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
   // MdDataTableModule,
  ],
  declarations: [
    ConstituentSearchComponent,
    MessageBoxComponent,
    NotFoundComponent,
    SearchTableComponent,
    DataTableComponent
  ],
  exports: [
    ConstituentSearchComponent,
    MessageBoxComponent,
    NotFoundComponent,
    DataTableComponent
  ],
  providers: [
    MessageBoxService,
    BaseDataTableService,
    HttpService,
    HttpHeaderService,
    AutoCompleteService,
    ValidatorService,
    ContactControlService,
  ],
  entryComponents: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ]
})
export class SharedModule { }
