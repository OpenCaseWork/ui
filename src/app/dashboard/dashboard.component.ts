import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';
import { AuthService }        from '../core/auth/auth.service';
import { IdleService }        from '../core/idle.service';
import { RouteUrlConstituent } from './dashboard-routing.urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app works!';
  invert = false;
  selected = '';
  items = [
    {text: 'Refresh'},
    {text: 'Settings'},
    {text: 'Help', disabled: true},
    {text: 'Sign Out'}
  ];

  iconItems = [
    {text: 'Redial', icon: 'dialpad'},
    {text: 'Check voicemail', icon: 'voicemail', disabled: true},
    {text: 'Disable alerts', icon: 'notifications_off'}
  ];

  constructor( private router: Router,
               private route: ActivatedRoute,
               private authService: AuthService,
               private idleService: IdleService) { }

  ngOnInit() {
    this.idleService.reset();
  }

  logout() {
    this.authService.logout();
    this.idleService.stop();
  }

  newConstituent() {
    this.router.navigate([RouteUrlConstituent()], { relativeTo: this.route });
  }

}
