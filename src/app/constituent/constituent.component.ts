import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstituentService } from './constituent.service';
import { LogService } from '../core/logging/log.service';
import { Constituent } from './models/constituent';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {
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
  }

  ngOnInit() {
    this.loadConstituent();
  }

  loadConstituent() {
    if (this.id > 0) {
      try {
        this.service.getConstituent(this.id)
          .subscribe(
          response => { this.constituent = response; console.log('returned firstName: ' + this.constituent.firstName); } ,
          err => {
            // Log errors if any
            this.logService.log(err);
          });
      } catch (error) {
        this.logService.log(error);
      }
    } else {
      this.constituent = new Constituent();
    }
  }

}
