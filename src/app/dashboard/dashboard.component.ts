import { Component,
         OnInit,
         ViewChild }  from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';
import { SessionService }        from '../core/session/session.service';
import { IdleService }        from '../core/session/idle.service';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  result: any;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private sessionService: SessionService,
               private idleService: IdleService) { }

  ngOnInit() {
    this.idleService.reset();
  }

  logout() {
    this.sessionService.logout();
    this.idleService.stop();
  }

}
