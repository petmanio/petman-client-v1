import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRoom } from '../../models/api';

// TODO: fix stars on mobile firefox
export interface IRoomComponent {

}

@Component({
  selector: 'app-room',
  template: `
    <md-card class="room-card">
      <md-card-header>
        <div md-card-avatar class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + room.user.userData.avatar + ')'}"></div>
        <md-card-title>{{room.user.userData.firstName}} {{room.user.userData.lastName}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-14 pm-color-red" [hidden]="isAvailable">
              <md-icon class="pm-font-14 pm-color-red">close</md-icon>
              Not available
            </span>
          <span class="pm-font-14 pm-color-green" [hidden]="!isAvailable">
              <md-icon class="pm-font-14 pm-color-green">check</md-icon>
              Available
            </span>
        </md-card-subtitle>
        <!--<div md-card-avatar class="pm-cart-avatar" [ngStyle]="{'background-image': 'url(' + room.user.userData.avatar + ')'}"></div>-->
        <!--<md-card-title>{{room.user.userData.firstName}} {{room.user.userData.lastName}}</md-card-title>-->
        <!--<md-card-subtitle></md-card-subtitle>-->
      </md-card-header>
      <img class="pm-cart-image-fixed-300" md-card-image [src]="room.images[0] && room.images[0].src">
      <md-card-content>
        <p class="pm-font-bold">
          {{room.cost}}$ / day
        </p>
        <p class="pm-room-description pm-font-14">{{room.description | appEllipsis}}</p>
      </md-card-content>
      <md-card-footer>
        <div class="columns is-mobile">
          <div class="column is-9">
            <rating [ngModel]="averageRating"
                    [max]="5"
                    fullIcon="★"
                    emptyIcon="☆"
                    [readonly]="true"
                    [disabled]="false"
                    [required]="true"
                    [float]="true"
                    [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
            <span class="pm-font-12 pm-color-gray">{{room.schedules.length}} review(s)</span>
          </div>
          <div class="column is-3 pm-room-details-button">
            <a md-button [routerLink]="['/room', room.id, 'details']">Details</a>
          </div>
        </div>
      </md-card-footer>
    </md-card>
  `,
  styles: [`
    .room-card  {}
    
    md-card-footer .pm-room-details-button {
      margin-top: -10px;
    }
    
    md-card-title {
      margin-top: 10px;
    }
    
    .pm-room-description {
      height: 50px;
    }
  `]
})
export class RoomComponent implements OnChanges, IRoomComponent {
  @Input() room: IRoom;
  averageRating: number;
  isAvailable: boolean;
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room']) {
      this.isAvailable = this.room.schedules.filter(schedule => schedule.deletedAt).length <= this.room.limit;
      this.averageRating = this.room.schedules.filter(schedule => !schedule.deletedAt).reduce((sum, el, i, array) => {
        sum += el.rating;
        return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
      }, 0);
    }
  }
}
