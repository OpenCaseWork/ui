import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule, MdMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginModule } from './areas/login/login.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './areas/dashboard/dashboard.module';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  // NOTE: the order of imported modules actually matters, especially for routing.
  // Modules with child router (Dashboard) need to be imported *before* the AppRoutingModule
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,
    LoginModule,
    CoreModule,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
