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
      <div class="column pm-became-host">
        <a md-button class="pm-fr" routerLink="/adopt/add">Add pet for adopt</a>
      </div>
    </div>
    <div class="columns">
      <div class="pm-adopt-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="columns" *ngFor="let adoptRow of (adoptList$ | async)?.list | chunk:3">
          <div class="column is-4" *ngFor="let adopt of adoptRow">
            <app-adopt-card [adopt]="adopt"></app-adopt-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }

    .pm-became-host {
      overflow: hidden;
      padding-top: 10px;
      padding-bottom: 0;
    }
    
    .pm-adopt-items {
      overflow: auto;
      width: 100%;
    }
    .pm-adopt-items {
      height: calc(100vh - 160px);
      height: -webkit-calc(100vh - 160px);
      height: -moz-calc(100vh - 160px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
     .pm-adopt-items {
        height: calc(100vh - 125px);
        height: -webkit-calc(100vh - 125px);
        height: -moz-calc(100vh - 125px);
      }
    }
  `]
})
export class AdoptListComponent implements OnInit, IAdoptListComponent {
  adoptList$: Observable<any>;
  isMobile = UtilService.getCurrentDevice() !== 'DESKTOP';
  private _skip = 0;
  private _limit = 9;
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