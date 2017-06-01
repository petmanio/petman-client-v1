import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWalker, IWalkerApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { MdDialog } from '@angular/material';
import { clone } from 'lodash';
import { WalkerReviewDialogComponent } from '../walker-review-dialog/walker-review-dialog.component';
export interface IWalkerReviewsListComponent {
  formatDate(date): string,
  formatDateMobile(date): string,
  onReviewClick(application: IWalkerApplication): void
}

@Component({
  selector: 'app-walker-reviews-list',
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
          <div class="pm-review-rating">
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
            <div *ngIf="walker && !application.rating && !walker.isOwner && application.consumer.id === (currentUser$ | async)?.id">
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

    .pm-review-rating {
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
export class WalkerReviewsListComponent implements OnInit, IWalkerReviewsListComponent {
  @Input() applications: IWalkerApplication[];
  @Input() walker: IWalker;
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

  onReviewClick(application: IWalkerApplication): void {
    const update = clone<IWalkerApplication>(application);
    const dialogRef = this.dialog.open(WalkerReviewDialogComponent);
    dialogRef.afterClosed().subscribe(reviewOptions => {
      if (reviewOptions) {
        update.rating = reviewOptions.rating;
        update.review = reviewOptions.review;
        this._store.dispatch(new walkerAction.UpdateApplicationAction(update));
      }
    });
  }
}
