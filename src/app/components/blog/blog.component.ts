import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";

import * as fromRoot from '../../store';
import * as blogAction from '../../store/blog/blog.actions';

export interface IBlogComponent {

}

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="columns" *ngFor="let blogRow of blogListData$ | async | chunk">
      <div class="column" *ngFor="let blog of blogRow">
        <md-card>
          <md-card-header>
            <md-card-title>{{blog.source}}</md-card-title>
            <md-card-subtitle>{{blog.date | date}}</md-card-subtitle>
          </md-card-header>        
          <img md-card-image [src]="blog.thumbnail">
          <!--<a [href]="blog.link" target="_blank"><img md-card-image [src]="blog.thumbnail"></a>-->
          <md-card-content>
            <p>{{blog.description}}</p>
          </md-card-content>
          <md-card-actions>
            <button md-button>LIKE</button>
            <button md-button>SHARE</button>
            <a md-button [href]="blog.link" target="_blank">READ</a>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `]
})
export class BlogComponent implements OnInit, IBlogComponent {
  public blogListData$: Observable<any>;
  private _skip: number = 0;
  private _limit: number = 9;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.blogListData$ = store.select(fromRoot.getBlogListData);
  }

  public ngOnInit(): void {
    this.store.dispatch(new blogAction.ListAction({ limit: this._limit, skip: this._skip }));
  }
}
