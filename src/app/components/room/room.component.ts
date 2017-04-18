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
        <div md-card-avatar class="pm-cart-avatar" [ngStyle]="{'background-image': 'url(' + room.user.userData.avatar + ')'}"></div>
        <md-card-title>{{room.user.userData.firstName}} {{room.user.userData.lastName}}</md-card-title>
        <!--<md-card-subtitle></md-card-subtitle>-->
      </md-card-header>
      <img class="pm-cart-image-fixed-300" md-card-image [src]="room.images[0] && room.images[0].src">
      <md-card-content>
        <p class="pm-font-bold">
          {{room.cost}}$ / day
        </p>
        <span class="pm-font-16">{{room.description}}</span>
      </md-card-content>
      <md-card-footer>
        <div class="pm-rating-row">
          <rating [ngModel]="averageRating"
                  [max]="5"
                  fullIcon="★"
                  emptyIcon="☆"
                  [readonly]="true"
                  [disabled]="false"
                  [required]="true"
                  [float]="true"
                  [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']">
          </rating>
          <span class="pm-font-12 pm-color-gray">{{room.user.reviews.length}} reviews</span>
        </div>
      </md-card-footer>
    </md-card>
  `,
  styles: [`
    .room-card .pm-rating-row {
      padding: 10px;
    }
    
    md-card-title {
      margin-top: 10px;
    }
  `]
})
export class RoomComponent implements OnChanges, IRoomComponent {
  @Input() room: IRoom;
  averageRating: number;
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room']) {
      this.averageRating = this.room.user.reviews.reduce((sum, el, i, array) => {
        sum += el.rating;
        return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
      }, 0);
    }
  }
}
