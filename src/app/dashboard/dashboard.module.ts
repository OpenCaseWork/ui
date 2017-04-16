import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule }         from '@angular/material';

import { DashboardComponent }     from './dashboard.component';
import { AccountsService }        from './shared/accounts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    AccountsService
  ]
})
export class DashboardModule {}
