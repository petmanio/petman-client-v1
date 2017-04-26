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
            <ngx-siema [options]="carouselOptions" *ngIf="(roomRoom$ | async)?.images">
              <ngx-siema-slide *ngFor="let image of (roomRoom$ | async)?.images">
                <img class="pm-carousel-image" [src]="image.src">
              </ngx-siema-slide>
            </ngx-siema>
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
              <div class="column is-4">
                <span class="pm-font-12 pm-color-gray">My applications</span>
                <md-list>
                  <div *ngFor="let i of [1,2,3]">
                    <md-list-item class="pm-cursor-pointer">
                      <div class="columns is-mobile pm-application-row">
                        <div class="column">
                          <div md-card-avatar class="pm-cart-avatar"
                               [ngStyle]="{'background-image': 'url(' + 'https://fb-s-a-a.akamaihd.net/h-ak-xfl1/v/t1.0-1/' +
                              'c0.0.480.480/p480x480' +
                          '/17990916_1671967849497512_7190601138827019061_n.jpg?oh=80c9d09ca63c770b8f8d21fa21b609b5&oe=59988214&__gda__=' +
                           '1503211597_553a09894fc90fcb6b2ffe02b5168d4f' + ')'}"></div>&nbsp;
                        </div>
                        <div class="column is-8">
                          <div class="pm-font-12 pm-color-gray pm-room-application-status">Waiting for provider confirmation</div>
                        </div>
                        <div class="column is-2">
                          <button md-icon-button>
                            <md-icon>info_outline</md-icon>
                          </button>
                        </div>
                      </div>
                    </md-list-item>
                    <md-divider></md-divider>
                  </div>
                </md-list>
              </div>
              <div class="column is-8 pm-application-info-window">
                <div class="pm-application-actions-row">
                  <button md-button>Cancel application</button>
                </div>
                <span class="pm-font-14 pm-color-gray">Chat history</span>
                <ul class="pm-chat-list">
                  <li *ngFor="let i of [1,2]">
                    <div class="columns is-mobile pm-chat-row">
                      <div class="column is-11">
                        <div class="pm-chat-text pm-background-light-pink">
                          <span class="pm-font-12 pm-color-white">
                            Lorem Ipsum is simply dummy text of the printing and typesetting </span>
                        </div>

                      </div>
                      <div class="column is-1">
                        <span class="pm-font-10 pm-color-gray">10:24</span>
                      </div>
                    </div>
                  </li>
                  <li *ngFor="let i of [1,2,3]">
                    <div class="columns is-mobile pm-chat-row">
                      <div class="column is-1-desktop is-2-mobile">
                        <div md-card-avatar class="pm-cart-avatar"
                             [ngStyle]="{'background-image': 'url(' + 'https://fb-s-a-a.akamaihd.net/h-ak-xfl1/v/t1.0-1/' +
                              'c0.0.480.480/p480x480' +
                          '/17990916_1671967849497512_7190601138827019061_n.jpg?oh=80c9d09ca63c770b8f8d21fa21b609b5&oe=59988214&__gda__=' +
                           '1503211597_553a09894fc90fcb6b2ffe02b5168d4f' + ')'}"></div>&nbsp;
                      </div>
                      <div class="column is-10-desktop is-8-mobile">
                        <div class="pm-chat-text pm-background-light-gray">
                          <span class="pm-font-12 pm-color-gray">
                            Lorem Ipsum is simply dummy text of the printing and typesetting  Lorem Ipsum is simply dummy text of 
                            the printing and typesetting  Lorem Ipsum is simply dummy text of the printing and typesetting </span>  
                        </div>
                        
                      </div>
                      <div class="column is-1">
                        <span class="pm-font-10 pm-color-gray">10:24</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="columns is-mobile pm-chart-actions">
                  <div class="column is-10">
                    <md-input-container>
                      <input mdInput placeholder="Type a message" name="message"/>
                    </md-input-container>    
                  </div>
                  <div class="column is-2"><button md-button>Send</button></div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    .pm-application-row {
      width: 100%;
      padding-top: 20px;
    }
    
    .pm-chat-row {
      width: 100%;
    }
    
    .pm-chat-list {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }
    
    .pm-chat-text {
      padding: 10px;
    }
    
    .pm-room-application-status {
      padding-top: 14px;
    }
    
    .pm-application-info-window md-input-container {
      width: 100%;
    }
    
    .pm-chart-actions input {
      padding: 5px 10px;
    }
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
