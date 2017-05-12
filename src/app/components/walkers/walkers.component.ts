import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { UtilService } from '../../services/util/util.service';

export interface IWalkersComponent {
  onScroll(): void
}

@Component({
  selector: 'app-walkers',
  template: `
    <div class="columns">
      <div class="column">
        <a md-icon-button class="pm-fr" routerLink="/walkers/add"><md-icon class="pm-color-gray pm-font-30">add_circle_outline</md-icon></a>
      </div>
    </div>
    <div class="columns">
      <div class="pm-walker-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.8s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true"
                   class="columns pm-width-100">
            <masonry-brick *ngFor="let walker of (walkerList$ | async)?.list"
                           class="column is-4-desktop is-6-tablet">
              <app-walker [walker]="walker"></app-walker>
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

    .pm-walker-items {
      overflow: auto;
      width: 100%;
      height: calc(100vh - 130px);
      height: -webkit-calc(100vh - 130px);
      height: -moz-calc(100vh - 130px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
     .pm-walker-items {
       height: calc(100vh - 120px);
       height: -webkit-calc(100vh - 120px);
       height: -moz-calc(100vh - 120px);
      }
    }
  `]
})
export class WalkersComponent implements OnInit, IWalkersComponent {
  walkerList$: Observable<any>;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.walkerList$ = _store.select(fromRoot.getWalkerList);
  }

  ngOnInit(): void {
    this._store.dispatch(new walkerAction.ListClearAction({}));
    this._store.dispatch(new walkerAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.walkerList$.subscribe($event => {
      this._count = $event.count;
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new walkerAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }
}
