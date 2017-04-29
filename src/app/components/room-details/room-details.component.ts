import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { clone } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IRoom, IRoomApplication } from '../../models/api';
import { RoomApplyDialogComponent } from '../room-apply-dialog/room-apply-dialog.component';
import { RoomApplicationsListComponent } from '../room-applications-list/room-applications-list.component';

export interface IRoomDetailsComponent {
  onRatingRowClick(): void
  onApplicationSelect(index: number): void,
  onActionClick(status: string): void
}

@Component({
  selector: 'app-room-details',
  template: `
    <md-card>
      <md-card-content>
        <div class="columns">
          <div class="column">
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
        <div class="columns">
          <div class="column">
            
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <app-room-rating-row
              (onButtonClick)="onRatingRowClick()"
              [averageRating]="averageRating"
              [hideAction]="!(roomRoom$ | async)?.isAvailable"
              [actionText]="(roomRoom$ | async)?.isOwner ? 'Edit' : 'Apply'"
            ></app-room-rating-row>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column">
                <div class="column is-6">
                  <span class="pm-font-12 pm-color-gray">3 review(s)</span>
                  <md-list>
                    <md-list-item>
                      <div md-card-avatar class="pm-cart-avatar"
                           [ngStyle]="{'background-image': 'url(' + 'https://fb-s-a-a.akamaihd.net/h-ak-xfl1' +
                            '/v/t1.0-1/c0.0.480.480/p480x480' +
                          '/17990916_1671967849497512_7190601138827019061_n.jpg?oh=80c9d09ca63c770b8f8d21fa21b609b5&oe=59988214&__gda__=' +
                           '1503211597_553a09894fc90fcb6b2ffe02b5168d4f' + ')'}"></div>&nbsp;
                      <rating [ngModel]="3"
                              [max]="5"
                              fullIcon="★"
                              emptyIcon="☆"
                              [readonly]="true"
                              [disabled]="false"
                              [required]="true"
                              [float]="true"
                              [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
                      <span class="pm-font-14 pm-color-gray">&nbsp; Andranik Antonyan<br/>
                      <span class="pm-font-12 pm-color-gray">&nbsp;&nbsp;&nbsp;
                        {{'Test review' || 'There are no review details'}}</span>
                    </span>
                    </md-list-item>
                  </md-list>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-5">
                <span class="pm-font-14 pm-color-gray">{{(roomRoom$ | async)?.isOwner ? 'Application requests' : 'My applications'}}</span>
                <app-room-applications-list [room]="roomRoom$ | async" 
                                            (onApplicationClick)="onApplicationSelect($event)"></app-room-applications-list>
              </div>
              <div class="column is-7 pm-application-info-window" *ngIf="selectedApplication">
                <div class="pm-font-16 pm-color-gray pm-action-label">Change application status</div>
                <app-room-application-actions [room]="roomRoom$ | async"
                                              [application]="selectedApplication"
                                              (onActionClick)="onActionClick($event)"></app-room-application-actions>
                <div class="pm-font-16 pm-color-gray pm-message-label">Chat history</div>
                <app-room-application-messages [room]="roomRoom$ | async"
                                               [application]="selectedApplication"></app-room-application-messages>
              </div>
            </div>
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
      min-height: 640px;
      overflow-x: auto;
    }
    
    app-room-application-messages {
      max-height: 500px;
      min-height: 500px;
      overflow-x: auto;
    }
    
    .pm-message-label {
      margin-top: 20px;
      padding-right: 10px;
      text-align: right;
    }
    
    .pm-action-label {
      margin-top: 25px;
      text-align: right;
      padding-right: 10px;
      margin-bottom: 15px;
    }
  `]
})
export class RoomDetailsComponent implements OnInit, OnDestroy, IRoomDetailsComponent {
  @ViewChild(RoomApplicationsListComponent) _roomApplicationList;
  // TODO: update attribute name
  roomRoom$: Observable<any>;
  averageRating: number;
  isAvailable: boolean;
  selectedApplication: IRoomApplication;
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
        if (this.room.applications.length) {
          this.selectedApplication = this.room.applications[0];
          this._roomApplicationList.selected = 0;
        }

        // TODO: update logic
        // TODO: functionality for future
        // this.isAvailable = this.inProgressApplications.length <= $event.limit;
        // this.averageRating = this.finishedApplications.reduce((sum, el, i, array) => {
        //   sum += el.rating;
        //   return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
        // }, 0);
      }
    });

    this._actions$
      .ofType(roomAction.ActionTypes.APPLY_COMPLETE)
      .takeUntil(this._destroyed$)
      .do(() => {
        this._store.dispatch(new roomAction.GetByIdAction({roomId: this._roomId}));
        // this._snackBar.open(`Your request has been sent`, null, {
        //   duration: 3000
        // })
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

  onApplicationSelect(index: number): void {
    this.selectedApplication = this.room.applications[index];
    this._roomApplicationList.selected = index;
  }

  onActionClick(status: 'WAITING' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'CONFIRMED' | 'FINISHED'): void {
    const application = clone<IRoomApplication>(this.selectedApplication);
    application.status = status;
    this._store.dispatch(new roomAction.UpdateApplicationAction(application));
  }

}
