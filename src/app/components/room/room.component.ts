import { Component } from '@angular/core';

export interface IRoomComponent {

}

@Component({
  selector: 'app-room',
  template: `
    <md-card class="room-card">
      <img md-card-image src="//lorempixel.com/400/200/">
      <md-card-content>
        <p class="pm-font-bold">
          2$/day Cozy Two Bedroom by Opera House
        </p>
        <span class="pm-font-12">Room</span>
      </md-card-content>
      <md-card-footer>
        <div class="pm-rating-row">
          <rating [ngModel]="4.4"
                  [max]="5"
                  fullIcon="★"
                  emptyIcon="☆"
                  [readonly]="true"
                  [disabled]="false"
                  [required]="true"
                  [float]="true"
                  [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']">
          </rating>
          <span class="pm-font-12 pm-color-gray">10 reviews</span>
        </div>
      </md-card-footer>
    </md-card>
  `,
  styles: [`
    .room-card .pm-rating-row {
      padding: 10px;
    }
  `]
})
export class RoomComponent implements IRoomComponent {
  constructor() {

  }
}
