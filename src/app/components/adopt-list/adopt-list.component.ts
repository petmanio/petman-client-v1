import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';
import { UtilService } from '../../services/util/util.service';

export interface IAdoptListComponent {
  onScroll(): void
}

@Component({
  selector: 'app-adopt-list',
  template: `
    <div class="columns">
      <div class="column">
        <a md-icon-button class="pm-fr" routerLink="/adopt/add"><md-icon class="pm-color-gray pm-font-30">add_circle_outline</md-icon></a>
      </div>
    </div>
    <div class="columns">
      <div class="pm-adopt-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.5s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true"
                   class="columns pm-width-100">
            <masonry-brick *ngFor="let adopt of (adoptList$ | async)?.list"
                           class="column is-4-desktop is-6-tablet">
              <app-adopt-card [adopt]="adopt"></app-adopt-card>
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
    
    .pm-adopt-items {
      overflow: auto;
      width: 100%;
      height: calc(100vh - 130px);
      height: -webkit-calc(100vh - 130px);
      height: -moz-calc(100vh - 130px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
     .pm-adopt-items {
       height: calc(100vh - 120px);
       height: -webkit-calc(100vh - 120px);
       height: -moz-calc(100vh - 120px);
      }
    }
  `]
})
export class AdoptListComponent implements OnInit, IAdoptListComponent {
  adoptList$: Observable<any>;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.adoptList$ = _store.select(fromRoot.getAdoptList);
  }

  ngOnInit(): void {
    this._store.dispatch(new adoptAction.ListClearAction({}));
    this._store.dispatch(new adoptAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.adoptList$.subscribe($event => {
      this._count = $event.count;
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new adoptAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }
}
