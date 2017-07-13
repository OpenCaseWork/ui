import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ConstituentComponent } from '../../areas/constituent/constituent.component';
import { AuthGuardService } from '../../core/auth/auth-guard.service';
import { RouteUrlDashboard } from '../../app-routing.urls';
import { AdminComponent } from '../../areas/admin/admin.component';
import { NotFoundComponent } from '../../shared/not-found.component';
import { RouteUrlConstituentSearch } from './dashboard-routing.urls';
import { ConstituentSearchComponent } from '../../shared/constituent-search/constituent-search.component';
import { RouteUrlHome,
         RouteUrlConstituent,
         RouteUrlAdmin,
         RouteUrlDashboardNotFound } from './dashboard-routing.urls';

const dashboardRoutes: Routes = [
  {
    path: RouteUrlDashboard(), canActivate: [AuthGuardService], component: DashboardComponent,
    children: [
      { path: '', redirectTo: RouteUrlHome(), pathMatch: 'full' },
      { path: RouteUrlHome(), component: HomeComponent },
      { path: RouteUrlConstituent(), component: ConstituentComponent },
      { path: RouteUrlConstituent() + '/:id', component: ConstituentComponent },
      { path: RouteUrlConstituentSearch(), component: ConstituentSearchComponent },
      { path: RouteUrlAdmin(), component: AdminComponent },
      { path: RouteUrlDashboardNotFound(), component: NotFoundComponent },
      { path: '**', redirectTo: RouteUrlDashboardNotFound() }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
