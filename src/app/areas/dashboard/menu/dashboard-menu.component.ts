import { Component, ViewChild }  from '@angular/core';
import 'rxjs/add/operator/first';
import { Router, ActivatedRoute }             from '@angular/router';
import { MdMenuTrigger, MdMenu, MdDialog, MdDialogRef } from '@angular/material';
import { RouteUrlConstituent, RouteUrlAdmin } from '../dashboard-routing.urls';
import { ConstituentSearchRecord } from '../../../models/constituents/search/constituents-search.models';
import { ConstituentSearchComponent } from '../../../shared/constituent-search/constituent-search.component';
import { NavigationStoreService } from '../../../state/store-services/navigation-store.service';
import { ResourceStoreService } from '../../../state/store-services/resource-store-service';
import { ResourceEnum } from '../../../state/resources/resource.service';
import { Observable } from 'rxjs/Observable';
import { ConstituentAggregate } from '../../../models/constituents/constituents-aggregates.models';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  @ViewChild('constituentMenuButton') constituentMenuTrigger: MdMenuTrigger;
  @ViewChild('appMenuConstituents') constituentMenu: MdMenu;
  constituent$: Observable<ConstituentAggregate>;
  open = false;
  searchResult: ConstituentSearchRecord;
  trigger: MdMenuTrigger;
  dialogRef: MdDialogRef<ConstituentSearchComponent> | null;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor( private router: Router,
               private route: ActivatedRoute,
               private navService: NavigationStoreService,
               private storeService: ResourceStoreService,
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
    this.storeService.newResource(ResourceEnum.Constituent);
    this.storeService.Resource$(ResourceEnum.Constituent)
      .map( x => <ConstituentAggregate> x)
      .filter(res => res.constituent.constituentId === 0)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        // if (res.constituent.constituentId === 0) {
          console.log('navigating to consituent');
          this.navService.newConstituent();
       // }
    });
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
