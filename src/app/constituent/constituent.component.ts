import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConstituentService } from './constituent.service';
import { LogService } from '../core/logging/log.service';
import { Constituent } from './models/constituent';
import { ConstituentDomains } from './models/constituent-domains';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {
  domains: ConstituentDomains;
  domain$: Observable<ConstituentDomains>;
  constituent: Constituent;
  private id: number;

  public constructor(private route: ActivatedRoute,
    private service: ConstituentService,
    private logService: LogService) {
    this.route.params
      .subscribe(params => {
        this.id = +params['id'];
        this.logService.log('id:' + this.id);
      });
    // this.domain$ = this.service.domain$();
  }

  ngOnInit() {
    //this.loadDomains();
    this.loadConstituent();
    this.domain$ = this.service.domain$();
    //this.service.domain$();
    //console.log('domains loaded' + this.service.domains);
  }

  loadDomains() {
    try {
      this.service.domain$()
        .subscribe(
        response => { this.domains = response; this.logService.log('ConstituentComponent loadDomains: ' + JSON.stringify(this.domains)); },
        err => {
          this.logService.log(err);
        });
    } catch (error) {
      this.logService.log('load domains error' + error);
    }
  }

  loadConstituent() {
    if (this.id > 0) {
      try {
        this.service.constituent$(this.id)
          .subscribe(
          response => { this.constituent = response; console.log('returned firstName: ' + this.constituent.firstName); },
          err => {
            this.logService.log(err);
          });
      } catch (error) {
        this.logService.log(error);
      }
    } else {
      this.constituent = new Constituent();
    }
  }

  saveConstituent() {
    try {
      this.service.saveConstituent$(this.constituent)
        .subscribe(
        response => { this.constituent = response; console.log('returned id: ' + this.constituent.constituentId); },
        err => {
          this.logService.log(err);
        });
    } catch (error) {
      this.logService.log(error);
    }
  }

}
