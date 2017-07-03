import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminModule } from '../../areas/admin/admin.module';
import { CustomMaterialModule } from '../../shared/custom-material.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { NotFoundComponent } from '../../shared/not-found.component';
import { ConstituentModule } from '../../areas/constituent/constituent.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SharedModule,
    FlexLayoutModule,
    AdminModule,
    ConstituentModule,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    DashboardMenuComponent
  ],
  providers: [
  ]
})
export class DashboardModule { }
