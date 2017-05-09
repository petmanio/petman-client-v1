import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRoom } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MdDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
// TODO: fix stars on mobile firefox
export interface IRoomComponent {
  formatDate(date): string,
  onShareClick(): void
}

@Component({
  selector: 'app-room',
  template: `
    <md-card class="room-card">
      <md-card-header>
        <div md-card-avatar class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + room.user.userData.avatar + ')'}"></div>
        <md-card-title>{{room.user.userData.firstName}} {{room.user.userData.lastName}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-12 pm-color-gray">
            {{formatDate(room.createdAt)}}
          </span>
        </md-card-subtitle>
        <a md-icon-button class="pm-room-action-open" [routerLink]="['/room', room.id, 'details']">
          <md-icon class="pm-font-16 pm-color-gray">open_in_new</md-icon>
        </a>
      </md-card-header>
      <md-divider></md-divider><br/>
      <!--<img class="pm-cart-image-fixed-300" md-card-image [src]="room.images[0] && room.images[0].src">-->
      <md-card-content [routerLink]="['/room', room.id, 'details']" class="pm-cursor-pointer">
        <div class="pm-room-description pm-font-16 pm-color-gray">{{room.description | appEllipsis:100}}</div>
        <div class="swiper-container" *ngIf="room.images.length" [swiper]="swiperOptions">
          <div class="swiper-wrapper">
            <div *ngFor="let image of room.images" class="swiper-slide">
              <img class="pm-carousel-image" [src]="image.src">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </md-card-content>
      <md-card-actions>
        <div class="pm-room-footer">
          <span class="pm-font-14 pm-color-gray"><i class="mdi mdi-cash-usd"></i> {{room.cost}}$ / day</span>&nbsp;
          <rating [ngModel]="averageRating"
                  [max]="5"
                  fullIcon="★"
                  emptyIcon="☆"
                  [readonly]="true"
                  [disabled]="false"
                  [required]="true"
                  [float]="true"
                  [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
          <button md-icon-button class="pm-room-action-share" (click)="onShareClick()">
            <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
          </button>
        </div>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    .room-card  {}

    md-card-title {
      margin-top: 10px;
    }
    
    .pm-room-description {
      margin-bottom: 25px;
    }

    .pm-carousel-image {
      height: 300px;
    }
    
    .swiper-container {
      width: calc(100% + 48px);
      margin: 0 -24px 16px -24px;
    }

    @media (max-width: 600px) {
      .swiper-container {
        width: calc(100% + 32px);
        margin: 16px -16px;
      }
    }
    
    .pm-room-action-open, .pm-room-action-share {
      margin-left: auto;
    }

    .pm-room-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class RoomComponent implements OnChanges, IRoomComponent {
  @Input() room: IRoom;
  averageRating: number;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 2800 + (Math.random() * 500),
    loop: true
  };
  constructor(private _dialog: MdDialog, private _store: Store<fromRoot.State>) {

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
            link: `${location.origin}/room/${this.room.id}/details`,
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room']) {
      this.averageRating = UtilService.countAverage(this.room.applications.filter(application => application.status === 'FINISHED'));
    }
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }
}
