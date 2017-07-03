import { NgModule }               from '@angular/core';
import { FlexLayoutModule }       from '@angular/flex-layout';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { MaterialModule }         from '@angular/material';

import { LoginComponent }         from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule {}
