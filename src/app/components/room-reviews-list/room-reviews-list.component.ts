import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { MdDialog } from '@angular/material';
import { clone } from 'lodash';
import { RoomReviewDialogComponent } from '../room-review-dialog/room-review-dialog.component';
export interface IRoomReviewsListComponent {
  formatDate(date): string,
  formatDateMobile(date): string,
  onReviewClick(application: IRoomApplication): void
}

@Component({
  selector: 'app-room-reviews-list',
  template: `
    <ul>
      <li class="pm-cursor-pointer pm-background-lightest-gray" *ngFor="let application of applications">
        <div class="pm-review-row">
          <div md-card-avatar class="pm-cart-avatar"
               [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
          <div class="pm-review-name">
            <span class="pm-font-14 pm-color-gray">
              {{application.consumer.userData.firstName}} {{application.consumer.userData.lastName}}</span><br/>
            <span class="pm-font-12 pm-color-gray">
              {{formatDate(application.createdAt)}} - {{formatDate(application.finsihedAt)}}</span>
          </div>
          <div class="pm-review-rating-item">
            <div *ngIf="application.rating">
              <rating [ngModel]="application.rating"
                      [max]="5"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="true"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
              <div><i class="pm-font-12 pm-color-gray">{{application.review}}</i></div>
            </div>
            <div *ngIf="room && !application.rating && !room.isOwner && application.consumer.id === (currentUser$ | async)?.id">
              <span class="pm-color-gray pm-font-14">{{'write_a_review' | translate}}</span>
              <button md-icon-button (click)="onReviewClick(application)">
                <md-icon>rate_review</md-icon>
              </button>
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
    
    .pm-review-rating-item {
      width: 150px;
    }

    .pm-review-name {
      width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    
    li {
      margin-bottom: 5px;
    }

    .pm-review-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 50px;
    }

    ul {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }

    md-icon {
      color: #fcdd7f;
    }
  `]
})
export class RoomReviewsListComponent implements OnInit, IRoomReviewsListComponent {
  @Input() applications: IRoomApplication[];
  @Input() room: IRoom;
  currentUser$: Observable<any>;
  constructor(private _store: Store<fromRoot.State>, private dialog: MdDialog) {

  }

  ngOnInit(): void {
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }

  formatDateMobile(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date, 'DD/M/YY');
  }

  onReviewClick(application: IRoomApplication): void {
    const update = clone<IRoomApplication>(application);
    const dialogRef = this.dialog.open(RoomReviewDialogComponent);
    dialogRef.afterClosed().subscribe(reviewOptions => {
      if (reviewOptions) {
        update.rating = reviewOptions.rating;
        update.review = reviewOptions.review;
        this._store.dispatch(new roomAction.UpdateApplicationAction(update));
      }
    });
  }
}
