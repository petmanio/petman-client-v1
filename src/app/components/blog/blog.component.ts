import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as blogAction from '../../store/blog/blog.actions';

export interface IBlogComponent {
  onScroll(): void
}

@Component({
  selector: 'app-blog',
  template: `
    <div class="columns">
      <div class="pm-blog-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.5s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true"
                   class="columns pm-width-100">
            <masonry-brick *ngFor="let blog of (blogList$ | async)?.list"
                           class="column is-4-desktop is-6-tablet">
              <app-blog-item [blog]="blog"></app-blog-item>
            </masonry-brick>
          </masonry>
        </div>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }
    .pm-blog-items {
      overflow: auto;
      width: 100%;
      height: calc(100vh - 70px);
      height: -webkit-calc(100vh - 70px);
      height: -moz-calc(100vh - 70px);
    }

    @media (max-width: 600px) and (orientation: portrait) {
      .pm-blog-items {
        height: calc(100vh - 60px);
        height: -webkit-calc(100vh - 60px);
        height: -moz-calc(100vh - 60px);
      }
    }
  `]
})
export class BlogComponent implements OnInit, IBlogComponent {
  public blogList$: Observable<any>;
  private _skip = 0;
  private _limit = 9;
  private _total: number = null;

  constructor(private _store: Store<fromRoot.State>) {
    this.blogList$ = _store.select(fromRoot.getBlogList);
  }

  ngOnInit(): void {
    this._store.dispatch(new blogAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.blogList$.subscribe($event => {
      this._total = $event.total;
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._total) {
      this._skip += this._limit;
      this._store.dispatch(new blogAction.ListLoadMoreAction({ limit: this._limit, skip: this._skip }));
    }
  }
}
