import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-constituent',
  templateUrl: './constituent.component.html',
  styleUrls: ['./constituent.component.css']
})
export class ConstituentComponent implements OnInit {
  private id: number;
  public constructor(private route: ActivatedRoute) {
    this.route.queryParams
      // TODO: look up constituent if id is present
      // .switchMap((params: Params) => this.service.getHero(+params['id']))
      // .subscribe((hero: Hero) => this.hero = hero);
      .subscribe(params => {
      this.id = params['id'];
      console.log('id:' + this.id);
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      // Load constituent for display
    }
  }

}
