import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IAdopt, IAdoptCommentListResponse } from '../../models/api';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { AdoptService } from '../../services/adopt/adopt.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

export interface IAdoptDetailsContainer {
  onDeleteClick(): void,
  formatDate(date): string,
  onShareClick(): void,
  onLoadMoreClick(): void
}

@Component({
  selector: 'app-adopt-details',
  template: `
    <md-card>
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <md-card-header>
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (adoptAdopt$ | async)?.user.userData.avatar + ')'}"></div>
              <md-card-title>
                {{(adoptAdopt$ | async)?.user.userData.firstName}} {{(adoptAdopt$ | async)?.user.userData.lastName}}</md-card-title>
              <md-card-subtitle>
              <span class="pm-font-12 pm-color-gray">
                {{formatDate((adoptAdopt$ | async)?.createdAt)}}
              </span>
              </md-card-subtitle>
            </md-card-header>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="swiper-container" *ngIf="(adoptAdopt$ | async)?.images.length" [swiper]="swiperOptions">
              <div class="swiper-wrapper">
                <div *ngFor="let image of (adoptAdopt$ | async)?.images" class="swiper-slide">
                  <img class="pm-carousel-image" [src]="image.src">
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column column is-10 is-offset-1">
            <div class="pm-details-actions">
              <button md-button class="pm-adopt-action-apply-edit" color="warn" (click)="onDeleteClick()"
                      *ngIf="(adoptAdopt$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-red">{{'delete' | translate}} &nbsp;<i class="mdi mdi-delete"></i></span>
              </button>
              <button md-icon-button class="pm-adopt-share" (click)="onShareClick()">
                <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
              </button>
            </div>
            <br/>
            <md-divider></md-divider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <span class="pm-color-gray pm-font-16">{{(adoptAdopt$ | async)?.description}}</span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <!--TODO: how another text if there are no comments-->
            <div class="pm-font-16 pm-color-gray pm-message-label" *ngIf="(comments$ | async).total">
              {{'comment_total' | translate:{total: (comments$ | async)?.total} }} <i class="mdi mdi-comment-multiple-outline"></i></div>
            <app-adopt-comments 
              [adopt]="adoptAdopt$ | async" 
              *ngIf="adoptAdopt$ | async"
              [comments]="comments$ | async"
              (loadMore)="onLoadMoreClick()"></app-adopt-comments>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    .pm-adopt-share {
      /*margin-left: auto;*/
    }
    
    .pm-details-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .pm-adopt-action-apply-edit {
      margin-left: auto;
    }
  `]
})
export class AdoptDetailsContainer implements OnInit, OnDestroy, IAdoptDetailsContainer {
  // TODO: update attribute name
  adoptAdopt$: Observable<any>;
  comments$: Observable<IAdoptCommentListResponse>;
  adopt: IAdopt;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    loop: false
  };
  private _adoptId: number;
  private _destroyed$ = new Subject<boolean>();
  private _routeListener;
  private _adoptListener;
  private _skip = 0;
  private _limit = 5;
  private _total = null;
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar,
              private _utilService: UtilService,
              private _router: Router,
              private _actions$: Actions,
              private _adoptService: AdoptService) {
    this.adoptAdopt$ = _store.select(fromRoot.getAdoptAdopt);
    this.comments$ = _store.select(fromRoot.getAdoptComments);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._routeListener = this._activatedRoute.params.subscribe((params: Params) => {
      this._adoptId = parseInt(params['adoptId'], 10);
      if (!this._adoptId) {
        // TODO: use global error handling
        throw new Error('AdoptDetailsContainer: adoptId is not defined');
      }

      // TODO: join on reconnect
      // TODO: remove from app.component, create listener list and push
      this._adoptService.joinComment({adoptId: this._adoptId}).subscribe();
      this._store.dispatch(new adoptAction.GetByIdAction({adoptId: this._adoptId}));
      this._store.dispatch(new adoptAction.CommentListAction({ adoptId: this._adoptId, skip: this._skip, limit: this._limit }));
    });

    this.comments$.subscribe($event => this._total = $event.total);
    this._adoptListener = this.adoptAdopt$.subscribe($event => this.adopt = $event);

    this._actions$
      .ofType(adoptAction.ActionTypes.GET_BY_ID_ERROR)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['404']);
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this._store.dispatch(new adoptAction.GetByIdClearAction({}));
    this._destroyed$.next(true);
    this._routeListener.unsubscribe();
    this._adoptListener.unsubscribe();
  }

  onLoadMoreClick(): void {
    if (this._skip + this._limit < this._total) {
      this._skip += this._limit;
      this._store.dispatch(new adoptAction.CommentListLoadMoreAction({ adoptId: this._adoptId, skip: this._skip, limit: this._limit }));
    }
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
              object : {
                'og:url': `${location.origin}/adopt/${this.adopt.id}/details`,
                'og:title': 'Petman',
                'og:description': this.adopt.description,
                'og:image': this.adopt.images[0].src
              }
            })
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new roomAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    });
  }

  onDeleteClick(): void {
    const _dialogRef = this._dialog.open(ConfirmDialogComponent);
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._store.dispatch(new adoptAction.DeleteByIdAction({adoptId: this.adopt.id}));
        this._actions$
          .ofType(adoptAction.ActionTypes.DELETE_BY_ID_COMPLETE)
          .takeUntil(this._destroyed$)
          .do(() => this._router.navigate(['adopt']))
          .subscribe();
      }
    });
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }
}
