import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { ILostFound, ILostFoundCommentListResponse } from '../../models/api';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { LostFoundService } from '../../services/lostFound/lostFound.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NgxGalleryOptions } from 'ngx-gallery/lib/ngx-gallery-options.model';

export interface ILostFoundDetailsComponent {
  onDeleteClick(): void,
  onShareClick(): void,
  onLoadMoreClick(): void
}

@Component({
  selector: 'app-lost-found-details',
  template: `
    <md-card *ngIf="lostFoundLostFound$ | async">
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <md-card-header>
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (lostFoundLostFound$ | async)?.user.userData.avatar + ')'}"></div>
              <md-card-title>
                {{(lostFoundLostFound$ | async)?.user.userData.firstName}} {{(lostFoundLostFound$ | async)?.user.userData.lastName}}
              </md-card-title>
              <md-card-subtitle>
              <span class="pm-font-12 pm-color-gray">
                {{(lostFoundLostFound$ | async)?.createdAt | appFormatDate}}
              </span>
              </md-card-subtitle>
              <md-chip-list *ngIf="(lostFoundLostFound$ | async)?.type">
                <md-chip>
                  {{(lostFoundLostFound$ | async)?.type | translate}}</md-chip>
              </md-chip-list>
            </md-card-header>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1 pm-text-center">
            <ngx-gallery *ngIf="(lostFoundLostFound$ | async)?.images.length" [options]="galleryOptions"
                         [images]="(lostFoundLostFound$ | async)?.images | addGalleryImages"></ngx-gallery>
          </div>
        </div>
        <div class="columns">
          <div class="column column is-10 is-offset-1">
            <div class="pm-details-actions">
              <button md-button class="pm-lost-found-action-apply-edit" color="warn" (click)="onDeleteClick()"
                      *ngIf="(lostFoundLostFound$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-red">{{'delete' | translate}} &nbsp;<i class="mdi mdi-delete"></i></span>
              </button>
              <button md-icon-button class="pm-lost-found-share" (click)="onShareClick()">
                <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
              </button>
            </div>
            <br/>
            <md-divider></md-divider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <span class="pm-color-gray pm-font-16">{{(lostFoundLostFound$ | async)?.description}}</span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <!--TODO: show another text if there are no comments-->
            <div class="pm-font-16 pm-color-gray pm-message-label" *ngIf="(comments$ | async)?.total">
              {{'comment_total' | translate:{total: (comments$ | async)?.total} }} <i class="mdi mdi-comment-multiple-outline"></i></div>
            <app-lost-found-comments 
              [lostFound]="lostFoundLostFound$ | async" 
              *ngIf="lostFoundLostFound$ | async"
              [comments]="comments$ | async"
              (loadMore)="onLoadMoreClick()"></app-lost-found-comments>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    .pm-lost-found-share {
      /*margin-left: auto;*/
    }
    
    .pm-details-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .pm-lost-found-action-apply-edit {
      /*margin-left: auto;*/
    }
    
    md-chip-list {
      margin-left: auto;
    }
  `]
})
export class LostFoundDetailsComponent implements OnInit, OnDestroy, ILostFoundDetailsComponent {
  // TODO: update attribute name
  lostFoundLostFound$: Observable<any>;
  comments$: Observable<ILostFoundCommentListResponse>;
  lostFound: ILostFound;
  galleryOptions: NgxGalleryOptions[] = UtilService.galleryOptions;
  private _lostFoundId: number;
  private _destroyed$ = new Subject<boolean>();
  private _routeListener;
  private _lostFoundListener;
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
              private _lostFoundService: LostFoundService) {
    this.lostFoundLostFound$ = _store.select(fromRoot.getLostFoundLostFound);
    this.comments$ = _store.select(fromRoot.getLostFoundComments);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._routeListener = this._activatedRoute.params.subscribe((params: Params) => {
      this._lostFoundId = parseInt(params['lostFoundId'], 10);
      if (!this._lostFoundId) {
        // TODO: use global error handling
        throw new Error('LostFoundDetailsComponent: lostFoundId is not defined');
      }

      // TODO: join on reconnect
      // TODO: remove from app.component, create listener list and push
      this._lostFoundService.joinComment({lostFoundId: this._lostFoundId}).subscribe();
      this._store.dispatch(new lostFoundAction.GetByIdAction({lostFoundId: this._lostFoundId}));
      this._store.dispatch(new lostFoundAction.CommentListAction({ lostFoundId: this._lostFoundId, skip: this._skip, limit: this._limit }));
    });

    this.comments$.subscribe($event => this._total = $event.total);
    this._lostFoundListener = this.lostFoundLostFound$.subscribe($event => this.lostFound = $event);

    this._actions$
      .ofType(lostFoundAction.ActionTypes.GET_BY_ID_ERROR)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['404']);
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this._store.dispatch(new lostFoundAction.GetByIdClearAction({}));
    this._destroyed$.next(true);
    this._routeListener.unsubscribe();
    this._lostFoundListener.unsubscribe();
  }

  onLoadMoreClick(): void {
    if (this._skip + this._limit < this._total) {
      this._skip += this._limit;
      this._store.dispatch(new lostFoundAction.CommentListLoadMoreAction({
        lostFoundId: this._lostFoundId, skip: this._skip, limit: this._limit }));
    }
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          // const fbShareOptions = {
          //   method: 'share_open_graph',
          //   action_type: 'og.shares',
          //   action_properties: JSON.stringify({
          //     object : {
          //       'og:url': `${location.origin}/lost-found/${this.lostFound.id}/details`,
          //       'og:title': 'Petman',
          //       'og:description': this.lostFound.description,
          //       'og:image': this.lostFound.images[0].src
          //     }
          //   })
          // };

          const fbShareOptions = {
            method: 'share',
            href: `${location.origin}/lost-found/${this.lostFound.id}/details`,
            hashtag: '#Petman'
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
        this._store.dispatch(new lostFoundAction.DeleteAction({lostFoundId: this.lostFound.id}));
        this._actions$
          .ofType(lostFoundAction.ActionTypes.DELETE_SUCCESS)
          .takeUntil(this._destroyed$)
          .do(() => this._router.navigate(['lost-found']))
          .subscribe();
      }
    });
  }
}
