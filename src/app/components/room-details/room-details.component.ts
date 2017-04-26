import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IRoom, IRoomApplication } from '../../models/api';
import { RoomApplyDialogComponent } from '../room-apply-dialog/room-apply-dialog.component';

export interface IRoomDetailsComponent {
  onRatingRowClick(): void
}

@Component({
  selector: 'app-room-details',
  template: `
    <md-card>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <md-card-header>
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + (roomRoom$ | async)?.user.userData.avatar + ')'}"></div>
            <md-card-title>
              {{(roomRoom$ | async)?.user.userData.firstName}} {{(roomRoom$ | async)?.user.userData.lastName}}</md-card-title>
            <md-card-subtitle>
            <span class="pm-font-14 pm-color-red" *ngIf="!(roomRoom$ | async)?.isAvailable">
              <md-icon class="pm-font-14 pm-color-red">close</md-icon>
              Not available
            </span>
              <span class="pm-font-14 pm-color-green" *ngIf="(roomRoom$ | async)?.isAvailable">
              <md-icon class="pm-font-14 pm-color-green">check</md-icon>
              Available
            </span>
            </md-card-subtitle>
          </md-card-header>
        </div>
      </div>
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <ngx-siema [options]="carouselOptions" *ngIf="(roomRoom$ | async)?.images">
              <ngx-siema-slide *ngFor="let image of (roomRoom$ | async)?.images">
                <img class="pm-carousel-image" [src]="image.src">
              </ngx-siema-slide>
            </ngx-siema>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <app-room-rating-row
              (onButtonClick)="onRatingRowClick()"
              [averageRating]="averageRating"
              [hideAction]="!(roomRoom$ | async)?.isAvailable"
              [actionText]="(roomRoom$ | async)?.isOwner ? 'Edit' : 'Apply'"
            ></app-room-rating-row>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="columns">
              <div class="column is-6">
                <span class="pm-font-12 pm-color-gray">{{finishedApplications.length}} review(s)</span>
                <md-list>
                  <md-list-item *ngFor="let application of finishedApplications">
                    <div md-card-avatar class="pm-cart-avatar"
                         [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
                    <rating [ngModel]="application.rating"
                            [max]="5"
                            fullIcon="★"
                            emptyIcon="☆"
                            [readonly]="true"
                            [disabled]="false"
                            [required]="true"
                            [float]="true"
                            [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
                    <span class="pm-font-14 pm-color-gray">&nbsp; {{application.consumer.userData.firstName}} 
                      {{application.consumer.userData.lastName}}<br/>
                      <span class="pm-font-12 pm-color-gray">&nbsp;&nbsp;&nbsp;
                        {{application.review || 'There are no review details'}}</span>
                    </span>
                  </md-list-item>
                </md-list>
              </div>
              <div class="column is-6">
                <span class="pm-font-12 pm-color-gray">In progress</span>
                <md-list>
                  <md-list-item *ngFor="let application of inProgressApplications">
                    <div md-card-avatar class="pm-cart-avatar"
                         [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
                    <span class="pm-font-14 pm-color-gray">&nbsp; {{application.consumer.userData.firstName}} 
                      {{application.consumer.userData.lastName}}<br/>
                      <span class="pm-font-12 pm-color-gray">&nbsp;&nbsp;&nbsp;From May 2017 to Jun 2017</span>
                    </span>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
  `]
})
export class RoomDetailsComponent implements OnInit, OnDestroy, IRoomDetailsComponent {
  // TODO: update attribute name
  roomRoom$: Observable<any>;
  averageRating: number;
  isAvailable: boolean;
  finishedApplications: IRoomApplication[] = [];
  inProgressApplications: IRoomApplication[] = [];
  myApplications: IRoomApplication[] = [];
  carouselOptions = {
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20
  };
  room: IRoom;
  private _roomId: number;
  private _destroyed$ = new Subject<boolean>();
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private dialog: MdDialog,
              private _snackBar: MdSnackBar,
              private _utilService: UtilService,
              private _actions$: Actions) {
    this.roomRoom$ = _store.select(fromRoot.getRoomRoom);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._activatedRoute.params.subscribe((params: Params) => {
      this._roomId = parseInt(params['roomId'], 10);
      if (!this._roomId) {
        // TODO: use global error handling
        throw new Error('RoomDetailsComponent: roomId is not defined');
      }
      return this._store.dispatch(new roomAction.GetByIdAction({roomId: this._roomId}));
    });

    this.roomRoom$.subscribe($event => {
      if ($event) {
        this.room = $event;
        this.inProgressApplications = $event.applications.filter(application => application.status === 'CONFIRMED' && !application.endedAt);
        this.finishedApplications = $event.applications.filter(application => application.status === 'CONFIRMED' && application.endedAt);
        this.myApplications = $event.applications.filter(application => application.status === 'CONFIRMED' && application.endedAt);

        // TODO: update logic
        // TODO: functionality for future
        // this.isAvailable = this.inProgressApplications.length <= $event.limit;
        this.averageRating = this.finishedApplications.reduce((sum, el, i, array) => {
          sum += el.rating;
          return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
        }, 0);
      }
    });

    this._actions$
      .ofType(roomAction.ActionTypes.APPLY_COMPLETE)
      .takeUntil(this._destroyed$)
      .do(() => {
        this._snackBar.open(`Your request has been sent`, null, {
          duration: 3000
        });
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onRatingRowClick(): void {
    if (this.room.isOwner) {
      this._snackBar.open(`Sorry but now edit functionality not available`, null, {
        duration: 3000
      });
    } else {
      // TODO: functionality for future
      // const dialogRef = this.dialog.open(RoomApplyDialogComponent);
      // dialogRef.componentInstance.room = this.room;
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(result);
      // });

      this._store.dispatch(new roomAction.ApplyAction({roomId: this._roomId}));
    }
  }

}
