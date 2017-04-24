import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRoom, IRoomSchedule } from '../../models/api';

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
          <span class="pm-font-14 pm-color-red" [hidden]="room.isAvailable">
              <md-icon class="pm-font-14 pm-color-red">close</md-icon>
              Not available
            </span>
          <span class="pm-font-14 pm-color-green" [hidden]="!room.isAvailable">
              <md-icon class="pm-font-14 pm-color-green">check</md-icon>
              Available
            </span>
        </md-card-subtitle>
      </md-card-header>
      <img class="pm-cart-image-fixed-300" md-card-image [src]="room.images[0] && room.images[0].src">
      <md-card-content>
        <p class="pm-font-bold">
          {{room.cost}}$ / day
        </p>
        <p class="pm-room-description pm-font-14">{{room.description | appEllipsis}}</p>
      </md-card-content>
      <md-card-footer>
        <app-room-rating-row
          [averageRating]="averageRating"
          [routerLink]="['/room', room.id, 'details']"
          actionText="Details"
        ></app-room-rating-row>
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
  finishedSchedules: IRoomSchedule[] = [];
  inProgressSchedules: IRoomSchedule[] = [];
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room']) {
      this.inProgressSchedules = this.room.schedules.filter(schedule => !schedule.deletedAt);
      this.finishedSchedules = this.room.schedules.filter(schedule => schedule.deletedAt);

      // TODO: update logic
      // TODO: functionality for future
      // this.isAvailable = this.inProgressSchedules.length <= $event.limit;
      this.averageRating = this.finishedSchedules.reduce((sum, el, i, array) => {
        sum += el.rating;
        return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
      }, 0);
    }
  }
}
