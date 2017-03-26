import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as blogAction from '../../store/blog/blog.actions';

export interface IBlogComponent {
  onScroll(): void
}

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="blog-list" infinite-scroll
            (scrolled)="onScroll()"
            [infiniteScrollDistance]="2"
            [infiniteScrollThrottle]="300"
            [scrollWindow]="false">
      <div class="columns" *ngFor="let blogRow of (blogListData$ | async)?.list | chunk">
        <div class="column" *ngFor="let blog of blogRow">
          <md-card>
            <md-card-header>
              <md-card-title>{{blog.source}}</md-card-title>
              <!--<md-card-subtitle>{{blog.date | date: 'dd/MM/yyyy'}}</md-card-subtitle>-->
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
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
    .blog-list {
      overflow: auto;
      height: calc(100% - 64px);
      height: -webkit-calc(100% - 64px);
      height: -moz-calc(100% - 64px);
    }
    @media (max-width: 600px) and (orientation: portrait) {
      .blog-list {
        height: calc(100% - 56px);
        height: -webkit-calc(100% - 56px);
        height: -moz-calc(100% - 56px);
      }
    }
  `]
})
export class BlogComponent implements OnInit, IBlogComponent {
  public blogListData$: Observable<any>;
  private _skip = 0;
  private _limit = 9;
  private _count: number = null;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.blogListData$ = store.select(fromRoot.getBlogListData);
  }

  ngOnInit(): void {
    const listener = this.blogListData$.subscribe((event) => {
      if (event.count === null) {
        this.store.dispatch(new blogAction.ListAction({ limit: this._limit, skip: this._skip }));
        if (listener) {
          listener.unsubscribe();
        }
      } else {
        this._count = event.count;
      }
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this.store.dispatch(new blogAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }
}
