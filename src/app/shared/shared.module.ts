import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from './custom-material.module';

import { ConstituentSearchComponent } from './constituent-search/constituent-search.component';
import { ConstituentSearchService } from './constituent-search/constituent-search.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box/message-box.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule
  ],
  declarations: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ],
  exports: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ],
  providers: [
    ConstituentSearchService,
    MessageBoxService
  ],
  entryComponents: [
    ConstituentSearchComponent,
    MessageBoxComponent
  ]
})
export class SharedModule { }
