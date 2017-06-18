import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';
import { UtilService } from '../../services/util/util.service';
import { IUser } from '../../models/api';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export interface ILostFoundListComponent {
  onScroll(): void,
  onFabClick(): void
}

@Component({
  selector: 'app-lost-found-list',
  template: `
    <div class="colomns is-hidden-mobile">
      <div class="column pm-page-intro">
        <md-icon color="primary">search</md-icon>&nbsp;&nbsp;&nbsp;
        <span class="pm-color-gray pm-font-18">{{'lost_or_found_intro' | translate}}</span>
      </div>
    </div>
    <div class="columns">
      <div class="pm-lost-found-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.5s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true"
                   class="columns pm-width-100">
            <!--TODO: fix, without ngRepeat brick does not work-->
            <masonry-brick *ngFor="let _ of [0]"
                           class="column is-4-desktop is-6-tablet">
              <md-card [routerLink]="['/lost-found/add']" class="pm-cursor-pointer" *ngIf="currentUser$ | async">
                <md-card-header>
                  <div md-card-avatar class="pm-cart-avatar"
                       [ngStyle]="{'background-image': 'url(' + (currentUser$ | async)?.userData.avatar + ')'}"></div>
                  <md-card-title></md-card-title>
                  <md-card-subtitle>
                    <span class="pm-font-12 pm-color-gray">
                      {{'add_new_application' | translate}}
                    </span>
                  </md-card-subtitle>
                  <a md-icon-button class="pm-action-add" [routerLink]="['/rooms/add']">
                    <md-icon class="pm-font-16 pm-color-gray">add</md-icon>
                  </a>
                </md-card-header>
              </md-card>
            </masonry-brick>
            <masonry-brick *ngFor="let lostFound of (lostFoundList$ | async)?.list"
                           class="column is-4-desktop is-6-tablet">
              <app-lost-found-card [lostFound]="lostFound"></app-lost-found-card>
            </masonry-brick>
          </masonry>
        </div>
        <div *ngIf="(lostFoundList$ | async)?.count > (lostFoundList$ | async)?.list.length"
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
    
    .pm-lost-found-items {
      overflow: auto;
      width: 100%;
      height: calc(100vh - 125px);
      height: -webkit-calc(100vh - 125px);
      height: -moz-calc(100vh - 125px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
      /* TODO: make flexible */
      .pm-lost-found-items {
        height: calc(100vh - 60px);
        height: -webkit-calc(100vh - 60px);
        height: -moz-calc(100vh - 60px);
      }
    }
  `]
})
export class LostFoundListComponent implements OnInit, OnDestroy, ILostFoundListComponent {
  lostFoundList$: Observable<any>;
  currentUser$: Observable<any>;
  currentUser: IUser;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this.lostFoundList$ = _store.select(fromRoot.getLostFoundList);
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    this._store.dispatch(new lostFoundAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.lostFoundList$.subscribe($event => {
      this._count = $event.count;
    });

    this.currentUser$.subscribe($event => this.currentUser = $event);
  }

  ngOnDestroy(): void {
    this._store.dispatch(new lostFoundAction.ListClearAction({}));
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new lostFoundAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onFabClick(): void {
    if (this.currentUser) {
      this._router.navigate(['/lost-found/add'])
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}
