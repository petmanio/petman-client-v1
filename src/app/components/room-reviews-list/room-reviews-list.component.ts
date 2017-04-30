import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoomApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

export interface IRoomReviewsListComponent {
  formatDate(date): string,
  formatDateMobile(date): string
}

@Component({
  selector: 'app-room-reviews-list',
  template: `
    <ul *ngFor="let application of applications">
      <li class="pm-cursor-pointer pm-background-lightest-gray">
        <div class="columns is-mobile pm-review-row">
          <div class="column is-1-desktop is-2-mobile">
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
          </div>
          <div class="column is-3">
            <div class="pm-room-review-padding">
              <span class="pm-font-14 pm-color-gray">
                {{application.consumer.userData.firstName}} {{application.consumer.userData.lastName}}
              </span><br/>
            </div>
          </div>
          <div class="column is-4">
            <div class="pm-room-review-padding">
              <rating [ngModel]="application.rating"
                      [max]="5"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="true"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
              <div><i class="pm-font-12 pm-color-gray">{{application.review || 'There are no review details'}}</i></div>
            </div>
          </div>
          <div class="column">
            <div class="pm-font-12 pm-color-gray pm-room-review-date is-hidden-mobile pm-room-review-padding">
              {{formatDate(application.createdAt)}} - {{formatDate(application.finsihedAt)}}
            </div>
            <div class="pm-font-12 pm-color-gray pm-room-review-date is-hidden-desktop">
              {{formatDateMobile(application.createdAt)}}<br/>{{formatDateMobile(application.finsihedAt)}}
            </div>
          </div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }

    .pm-review-row {
      width: 100%;
    }
    
    .pm-room-review-padding {
      padding-top: 10px;
    }

    .pm-room-review-date {
      text-align: right;
    }

    ul {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }
  `]
})
export class RoomReviewsListComponent implements IRoomReviewsListComponent {
  @Input() applications: IRoomApplication[];
  constructor() {

  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }

  formatDateMobile(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date, 'L');
  }
}
