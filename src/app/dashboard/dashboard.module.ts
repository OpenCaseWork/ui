import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { MaterialModule }         from '@angular/material';
import { CustomMaterialModule }         from '../shared/custom-material.module';

import { ConstituentComponent }   from '../constituent/constituent.component';
import { HomeComponent }          from './home/home.component';
import { DashboardComponent }     from './dashboard.component';
import { DashboardMenuComponent }     from './menu/dashboard-menu.component';
import { AccountsService }        from './shared/accounts.service';
import { SharedModule }           from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CustomMaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent,
    ConstituentComponent,
    HomeComponent,
    DashboardMenuComponent
  ],
  providers: [
    AccountsService
  ]
})
export class DashboardModule {}
