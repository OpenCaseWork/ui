import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomMaterialModule } from './custom-material.module';

import { ConstituentSearchComponent } from './constituent-search/constituent-search.component';
import { ConstituentSearchDialogService } from './constituent-search/constituent-search-dialog.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message-box.service';
import { NotFoundComponent } from './not-found.component';
import { DataTableDemo } from './material/data-table-demo/data-table-demo';
import { DataTableHeader } from './material/data-table-demo/data-table-header';
import { MdDataTableModule } from './material/data-table/index';
import { PaginationControl } from './material/data-table-demo/pagination-control';
import { PeopleDatabase } from './material/data-table-demo/people-database';
import { BaseDataService } from './data-table/base-data.service';
import { SearchTableComponent } from './constituent-search/search-table.component';
import { ConstituentSearchService } from './constituent-search/constituent-search.service';
import { HttpService } from '../core/http/http.service';
import { HttpHeaderService } from '../core/http/http-header.service';
import { AutoCompleteService } from './control-services/auto-complete.service';
import { ValidatorService } from './control-services/validator.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    NgxDatatableModule,
    MdDataTableModule,
  ],
  declarations: [
    ConstituentSearchComponent,
    MessageBoxComponent,
    NotFoundComponent,
    DataTableDemo,
    DataTableHeader,
    PaginationControl,
    SearchTableComponent
  ],
  exports: [
    ConstituentSearchComponent,
    MessageBoxComponent,
    NotFoundComponent
  ],
  providers: [
    ConstituentSearchDialogService,
    MessageBoxService,
    PeopleDatabase,
    BaseDataService,
    ConstituentSearchService,
    HttpService,
    HttpHeaderService,
    AutoCompleteService,
    ValidatorService
  ],
  entryComponents: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ]
})
export class SharedModule { }
