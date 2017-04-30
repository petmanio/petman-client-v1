import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

// TODO: fix stars on mobile firefox
export interface IRoomComponent {
  formatDate(date): string
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
  constructor() {

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
