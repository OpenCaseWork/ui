import { Component,
         OnInit,
         ViewChild,
         AfterViewInit }  from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';
import { RouteUrlConstituent } from '../dashboard-routing.urls';
import { ConstituentSearchService } from '../../shared/constituent-search/constituent-search.service';
import { MdMenuTrigger, MdMenu } from '@angular/material';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('constituentMenuButton') constituentMenuTrigger: MdMenuTrigger;
  @ViewChild('appMenuConstituents') constituentMenu: MdMenu;
  open = false;
  title = 'app works!';
  invert = false;
  result: any;
  selected = '';
  trigger: MdMenuTrigger;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private searchService: ConstituentSearchService) { }

  ngOnInit() {
    console.log('hello `dashboard-menu` component');
  }

  ngAfterViewInit() {
  }

  searchConstituent() {
    this.searchService.search().subscribe(res => this.result = res);
  }

  openMenu() {
    if (this.open === false) {
      // TODO: find out how to programmatically control menu open/close
      // right now can't seem to see if menu open or closed
      this.constituentMenuTrigger.openMenu();
      this.open = true;
    }
  }

  closeMenu() {
    // this.constituentMenuTrigger.closeMenu();
  }

  newConstituent() {
    this.router.navigate([RouteUrlConstituent()], { relativeTo: this.route });
  }

  howBilling() {
  }
  howReports() {
  }
  dailyTimeEntry() {
  }
  newNAPISIntake() {
  }

}
