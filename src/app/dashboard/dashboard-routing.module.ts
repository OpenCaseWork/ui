import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { DashboardComponent }     from './dashboard.component';
import { ConstituentComponent }     from '../constituent/constituent.component';
import { AuthGuardService }       from '../core/auth-guard.service';
import { RouteUrlDashboard,
         RouteUrlHome, RouteUrlConstituent }      from '../app-routing.urls';

const dashboardRoutes: Routes = [
    { path: RouteUrlDashboard(), canActivate: [AuthGuardService], component: DashboardComponent,
    children: [
        { path: '', redirectTo: RouteUrlHome(), pathMatch: 'full' },
        { path: RouteUrlHome(), component: ConstituentComponent },
        { path: RouteUrlConstituent(), component: ConstituentComponent  },
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
