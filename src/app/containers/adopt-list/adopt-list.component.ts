import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';
import { UtilService } from '../../services/util/util.service';
import { IUser } from '../../models/api';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export interface IAdoptListComponent {
  onScroll(): void,
  onFabClick(): void
}

@Component({
  selector: 'app-adopt-list',
  template: `
    <div class="colomns is-hidden-mobile">
      <div class="column pm-page-intro">
        <md-icon color="primary">pets</md-icon>
        <span class="pm-color-gray pm-font-18">{{'adopt_intro' | translate}}</span>
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
        <div *ngIf="(adoptList$ | async)?.count > (adoptList$ | async)?.list.length"
             class="pm-font-14 pm-color-gray pm-load-more pm-cursor-pointer"
             (click)="onScroll(); $event.stopPropagation()">
          {{'load_more' | translate}} <i class="mdi mdi-dots-horizontal"></i></div>
      </div>
      <button md-fab class="pm-fab" (click)="onFabClick()">
        <md-icon>add</md-icon>
      </button>
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
      height: calc(100vh - 125px);
      height: -webkit-calc(100vh - 125px);
      height: -moz-calc(100vh - 125px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
      /* TODO: make flexible */
      .pm-adopt-items {
        height: calc(100vh - 60px);
        height: -webkit-calc(100vh - 60px);
        height: -moz-calc(100vh - 60px);
      }
    }
  `]
})
export class AdoptListComponent implements OnInit, OnDestroy, IAdoptListComponent {
  adoptList$: Observable<any>;
  currentUser$: Observable<any>;
  currentUser: IUser;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this.adoptList$ = _store.select(fromRoot.getAdoptList);
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    this._store.dispatch(new adoptAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.adoptList$.subscribe($event => {
      this._count = $event.count;
    });

    this.currentUser$.subscribe($event => this.currentUser = $event);
  }

  ngOnDestroy(): void {
    this._store.dispatch(new adoptAction.ListClearAction({}));
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new adoptAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onFabClick(): void {
    if (this.currentUser) {
      this._router.navigate(['/adopt/add'])
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}