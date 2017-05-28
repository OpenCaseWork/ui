import { Component,
         OnInit,
         ViewChild,
         AfterViewInit }  from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';
import { RouteUrlConstituent, RouteUrlAdmin } from '../dashboard-routing.urls';
import { ConstituentSearchDialogService } from '../../shared/constituent-search/constituent-search-dialog.service';
import { MdMenuTrigger, MdMenu } from '@angular/material';
import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('constituentMenuButton') constituentMenuTrigger: MdMenuTrigger;
  @ViewChild('appMenuConstituents') constituentMenu: MdMenu;
  open = false;
  invert = false;
  searchResult: ConstituentSearchRecord;
  selected = '';
  trigger: MdMenuTrigger;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private searchService: ConstituentSearchDialogService) { }

  ngOnInit() {
    console.log('hello `dashboard-menu` component');
  }

  ngAfterViewInit() {
  }

  searchConstituent() {
    this.searchService.search().subscribe(
      res => { this.searchResult = res; },
      error => { console.log('error:' + error); },
      () => {
        console.log('search returned');
        if (this.searchResult) {
          // navigate to constituent form, passing constituent id
           this.router.navigate([RouteUrlConstituent(), this.searchResult.id ], { relativeTo: this.route });
        }
      }
    );
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
    this.router.navigate(['unkonwn'], { relativeTo: this.route });
  }

  newNAPISIntake() {
  }
  admininstration() {
    this.router.navigate([RouteUrlAdmin()], { relativeTo: this.route });
  }

}
