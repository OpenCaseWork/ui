import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomMaterialModule } from './custom-material.module';

import { ConstituentSearchComponent } from './constituent-search/constituent-search.component';
import { ConstituentSearchService } from './constituent-search/constituent-search.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message-box.service';
import { NotFoundComponent } from './not-found.component';
import { DataTableDemo } from './material/data-table-demo/data-table-demo';
import { DataTableHeader } from './material/data-table-demo/data-table-header';
import { MdDataTableModule } from './material/data-table/index';
import { PaginationControl } from './material/data-table-demo/pagination-control';
import { PeopleDatabase } from './material/data-table-demo/people-database';

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
  ],
  exports: [
    ConstituentSearchComponent,
    MessageBoxComponent,
    NotFoundComponent
  ],
  providers: [
    ConstituentSearchService,
    MessageBoxService,
    PeopleDatabase,
  ],
  entryComponents: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ]
})
export class SharedModule { }
