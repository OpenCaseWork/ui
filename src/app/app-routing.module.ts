import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './areas/login/login.component';
import { NotFoundComponent } from './shared/not-found.component';
import { DashboardComponent } from './areas/dashboard/dashboard.component';
import { ConstituentComponent } from './areas/constituent/constituent.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { RouteUrlLogin,
         RouteUrlDashboard,
         RouteUrlNotFound } from './app-routing.urls';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: RouteUrlLogin(), pathMatch: 'full' },
      { path: RouteUrlLogin(), component: LoginComponent },
      { path: RouteUrlDashboard(), component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: RouteUrlNotFound() , component: NotFoundComponent},
      { path: '**', redirectTo: RouteUrlNotFound() }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
