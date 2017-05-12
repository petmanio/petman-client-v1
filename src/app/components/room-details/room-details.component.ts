import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { clone } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IRoom, IRoomApplication } from '../../models/api';
import { RoomApplicationsListComponent } from '../room-applications-list/room-applications-list.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist';
import { RoomReviewDialogComponent } from '../room-review-dialog/room-review-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

export interface IRoomDetailsComponent {
  onRatingRowClick(): void
  onApplicationSelect(application: IRoomApplication): void,
  onActionClick(status: string): void,
  onShareClick(): void,
  formatDate(date): string
}

@Component({
  selector: 'app-room-details',
  template: `
    <md-card>
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <md-card-header>
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (roomRoom$ | async)?.user.userData.avatar + ')'}"></div>
              <md-card-title>
                {{(roomRoom$ | async)?.user.userData.firstName}} {{(roomRoom$ | async)?.user.userData.lastName}}</md-card-title>
              <md-card-subtitle>
              <span class="pm-font-12 pm-color-gray">
                {{formatDate((roomRoom$ | async)?.createdAt)}}
              </span>
              </md-card-subtitle>
            </md-card-header>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="swiper-container" *ngIf="(roomRoom$ | async)?.images.length" [swiper]="swiperOptions">
              <div class="swiper-wrapper">
                <div *ngFor="let image of (roomRoom$ | async)?.images" class="swiper-slide">
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
              <span class="pm-font-14 pm-color-gray"><i class="mdi mdi-cash-usd"></i> {{(roomRoom$ | async)?.cost}}$ / day</span>&nbsp;
              <rating [ngModel]="averageRating"
                      [max]="5"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="true"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
              <button md-button class="pm-room-action-apply-edit" (click)="onRatingRowClick()" *ngIf="!(roomRoom$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-gray">Apply &nbsp;<i class="mdi mdi-plus"></i></span>
              </button>
              <button md-button class="pm-room-action-apply-edit" (click)="onRatingRowClick()" *ngIf="(roomRoom$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-gray">Edit &nbsp;<i class="mdi mdi-table-edit"></i></span>
              </button>
              &nbsp;&nbsp;
              <button md-icon-button (click)="onShareClick()">
                <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
              </button>
            </div>
            <br/>
            <md-divider></md-divider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <span class="pm-color-gray pm-font-16">{{(roomRoom$ | async)?.description}}</span>
          </div>
        </div>
        <div class="columns">
          <!--<div class="column column is-4 is-offset-1">-->
            <!--<div class="pm-font-16 pm-color-gray pm-history-label">Review statistics</div>-->
            <!--<app-room-statistics [applications]="finishedApplications"></app-room-statistics>-->
          <!--</div>-->
          <div class="column is-10 is-offset-1">
            <div class="pm-font-16 pm-color-gray pm-history-label">History & reviews <i class="mdi mdi-history"></i></div>
            <app-room-reviews-list [applications]="finishedApplications" [room]="roomRoom$ | async"></app-room-reviews-list>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop is-5-tablet is-offset-1">
            <span class="pm-font-16 pm-color-gray">{{(roomRoom$ | async)?.isOwner ? 'Application requests' : 'My applications'}} 
              <i class="mdi mdi-application"></i></span>
            <app-room-applications-list [applications]="inProgressApplications"
                                        [room]="roomRoom$ | async"
                                        (onApplicationClick)="onApplicationSelect($event)"></app-room-applications-list>
          </div>
          <div class="column is-6-desktop is-5-tablet pm-application-info-window" *ngIf="selectedApplication">
            <div class="pm-font-16 pm-color-gray pm-action-label">Status <i class="mdi mdi-check-all"></i></div>
            <app-room-application-actions [room]="roomRoom$ | async"
                                          [application]="selectedApplication"
                                          (onActionClick)="onActionClick($event)"></app-room-application-actions>
            <div class="pm-font-16 pm-color-gray pm-message-label">Chat history <i class="mdi mdi-wechat"></i></div>
            <app-room-application-messages [room]="roomRoom$ | async"
                                           [application]="selectedApplication"></app-room-application-messages>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    app-room-application-actions {
      /*margin-top: 25px;*/
    }
    app-room-applications-list {
      max-height: 640px;
      overflow-x: auto;
    }
    
    app-room-application-messages {
      /*min-height: 200px;*/
      max-height: 500px;
      overflow-x: auto;
    }

    app-room-reviews-list {
      max-height: 500px;
      overflow-x: auto;
    }
    
    .pm-message-label {
      margin-top: 20px;
      padding-right: 10px;
      text-align: right;
    }
    
    .pm-action-label {
      margin-top: 0;
      text-align: right;
      padding-right: 10px;
      margin-bottom: 15px;
    }

    .pm-history-label {
      margin-top: 25px;
      text-align: left;
      padding-right: 10px;
      margin-bottom: 15px;
    }

    .pm-details-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .pm-room-action-apply-edit {
      margin-left: auto;
    }

  `]
})
export class RoomDetailsComponent implements OnInit, OnDestroy, IRoomDetailsComponent {
  @ViewChild(RoomApplicationsListComponent) _roomApplicationList;
  // TODO: update attribute name
  roomRoom$: Observable<any>;
  averageRating: number;
  selectedApplication: IRoomApplication;
  inProgressApplications: IRoomApplication[];
  finishedApplications: IRoomApplication[];
  room: IRoom;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    loop: true
  };
  private _roomId: number;
  private _destroyed$ = new Subject<boolean>();
  private _roomListener;
  private _routeListener;
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar,
              private _utilService: UtilService,
              private _actions$: Actions) {
    this.roomRoom$ = _store.select(fromRoot.getRoomRoom);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._routeListener = this._activatedRoute.params.subscribe((params: Params) => {
      this._roomId = parseInt(params['roomId'], 10);
      if (!this._roomId) {
        // TODO: use global error handling
        throw new Error('RoomDetailsComponent: roomId is not defined');
      }
      return this._store.dispatch(new roomAction.GetByIdAction({roomId: this._roomId}));
    });

    this._roomListener = this.roomRoom$.subscribe($event => {
      if ($event) {
        this.room = $event;
        this.inProgressApplications = this.room.applications.filter(application => application.status !== 'FINISHED');
        this.finishedApplications = this.room.applications.filter(application => application.status === 'FINISHED');
        if (this.inProgressApplications.length) {
          this.selectedApplication = this.inProgressApplications[0];
          this._roomApplicationList.selected = 0;
        } else {
          this.selectedApplication = null;
        }
        this.averageRating = UtilService.countAverage(this.room.applications.filter(application => application.status === 'FINISHED'));
      }
    });

    // TODO: load data from server after complete using data from server, push application inside reducer, change socket part also
    // this._actions$
    //   .ofType(roomAction.ActionTypes.APPLY_COMPLETE)
    //   .takeUntil(this._destroyed$)
    //   .do(() => {
    //     this._store.dispatch(new roomAction.GetByIdAction({roomId: this._roomId}));
    //   })
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._roomListener.unsubscribe();
    this._routeListener.unsubscribe();
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'feed',
            name: 'Petman',
            link: `${location.origin}/rooms/${this.room.id}/details`,
            picture: this.room.images[0].src,
            description: this.room.description
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new roomAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }

  onRatingRowClick(): void {
    if (this.room.isOwner) {
      this._snackBar.open(`Sorry but now edit functionality not available`, null, {
        duration: 3000
      });
    } else if (this.inProgressApplications.some(application => application.status === 'WAITING')) {
      this._snackBar.open(`Sorry but you have in progress application`, null, {
        duration: 3000
      });
    } else {
      this._store.dispatch(new roomAction.ApplyAction({roomId: this._roomId}));
    }
  }

  onApplicationSelect(application: IRoomApplication): void {
    this.selectedApplication = application;
  }

  onActionClick(status: 'WAITING' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'CONFIRMED' | 'FINISHED'): void {
    const application = clone<IRoomApplication>(this.selectedApplication);
    application.status = status;

    if (application.status === 'FINISHED') {
      if (this.room.isOwner) {
        this._store.dispatch(new roomAction.UpdateApplicationAction(application));
      } else  {
        const _dialogRef = this._dialog.open(RoomReviewDialogComponent);
        _dialogRef.afterClosed().subscribe(reviewOptions => {
          if (reviewOptions) {
            application.rating = reviewOptions.rating;
            application.review = reviewOptions.review;
            this._store.dispatch(new roomAction.UpdateApplicationAction(application));
          }
        });
      }

    } else {
      this._store.dispatch(new roomAction.UpdateApplicationAction(application));
    }
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }

}
