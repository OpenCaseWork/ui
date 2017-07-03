import { Component, ViewChild }  from '@angular/core';
import 'rxjs/add/operator/first';
import { Router, ActivatedRoute }             from '@angular/router';
import { RouteUrlConstituent, RouteUrlAdmin } from '../dashboard-routing.urls';
import { ConstituentSearchDialogService } from '../../shared/constituent-search/constituent-search-dialog.service';
import { MdMenuTrigger, MdMenu, MdDialog, MdDialogRef } from '@angular/material';
import { ConstituentSearchRecord } from '../../models/constituents/search/constituents-search.models';
import { ConstituentSearchComponent } from '../../shared/constituent-search/constituent-search.component';
import { NavigationStoreService } from '../../state/store-services/navigation-store.service';
import { ConstituentStoreService } from '../../state/store-services/constituent-store-service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  @ViewChild('constituentMenuButton') constituentMenuTrigger: MdMenuTrigger;
  @ViewChild('appMenuConstituents') constituentMenu: MdMenu;
  open = false;
  searchResult: ConstituentSearchRecord;
  trigger: MdMenuTrigger;
  dialogRef: MdDialogRef<ConstituentSearchComponent> | null;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private searchService: ConstituentSearchDialogService,
               private navService: NavigationStoreService,
               private constituentStoreService: ConstituentStoreService,
               public dialog: MdDialog) { }

  searchConstituent() {
    this.dialogRef = this.dialog.open(ConstituentSearchComponent);

    this.dialogRef.afterClosed()
      .subscribe(result => {
        console.log('result');
        this.searchResult = result;
        this.dialogRef = null;
        if (this.searchResult) {
          // navigate to constituent form, passing constituent id
          console.log('navigating to consituent');
          // this.router.navigate([RouteUrlConstituent(), this.searchResult.id ], { relativeTo: this.route });
          this.navService.openConstituent(this.searchResult.id);
       }
      });
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
  }

   newConstituent() {
     this.navService.newConstituent();
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
