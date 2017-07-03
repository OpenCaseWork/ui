import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../shared/custom-material.module';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule
  ],
  declarations: [
    AdminComponent,
  ],
  exports: [
    AdminComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class AdminModule { }
