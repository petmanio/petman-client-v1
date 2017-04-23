import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IRoomRatingRowComponent {

}

@Component({
  selector: 'app-room-rating-row',
  template: `
    <div class="columns is-mobile">
      <div class="column is-8">
        <span class="pm-font-12 pm-color-gray">Average rating &nbsp;</span>
        <rating [ngModel]="averageRating"
                [max]="5"
                fullIcon="★"
                emptyIcon="☆"
                [readonly]="true"
                [disabled]="false"
                [required]="true"
                [float]="true"
                [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
      </div>
      <div class="column is-4">
        <a class="pm-room-details-button" *ngIf="routerLink && !hideAction" md-button [routerLink]="routerLink" 
           [disabled]="disabled">{{actionText}}</a>
        <button class="pm-room-details-button" 
                *ngIf="!routerLink && !hideAction" md-button class="pm-fr" (click)="onButtonClick.emit($event)"
                [disabled]="disabled">{{actionText}}</button>
      </div>
    </div>
  `,
  styles: [`
    .pm-room-details-button {
      margin-top: -10px;
    }
  `]
})
export class RoomRatingRowComponent implements IRoomRatingRowComponent {
  @Input() averageRating: 0;
  @Input() routerLink: null;
  @Input() actionText: '';
  @Input() disabled = false;
  @Input() hideAction = false;
  @Output() onButtonClick = new EventEmitter();
  constructor() {

  }
}
