import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../core/session/session.service';
import { IdleService } from '../core/session/idle.service';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { ConstituentService } from '../constituent/constituent.service';
import { ConstituentDomains } from '../models/constituents/domains/constituents-domains.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constituentDomain$: Observable<ConstituentDomains>;
  result: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private idleService: IdleService,
    private constituentService: ConstituentService) { }

  ngOnInit() {
    this.idleService.reset();
    this.constituentDomain$ = this.constituentService.domain$();
    this.loadDomains();
  }

  logout() {
    this.sessionService.logout();
    this.idleService.stop();
  }


  loadDomains() {
      try {
        this.constituentService.domain$().subscribe(
          response => {
            console.log('ConstituentComponent loadDomains: ' + JSON.stringify(response));
          },
          err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
  }

}
