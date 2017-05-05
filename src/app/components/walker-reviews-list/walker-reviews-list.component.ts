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
    <ul *ngFor="let application of applications">
      <li class="pm-cursor-pointer pm-background-lightest-gray">
        <div class="columns is-mobile pm-review-row">
          <div class="column is-1-desktop is-2-mobile">
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
          </div>
          <div class="column is-3">
            <div class="pm-walker-review-padding">
              <span class="pm-font-14 pm-color-gray">
                {{application.consumer.userData.firstName}} {{application.consumer.userData.lastName}}
              </span><br/>
            </div>
          </div>
          <div class="column">
            <div class="pm-walker-review-padding">
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
                <div><i class="pm-font-12 pm-color-gray">{{application.review || 'There are no review details'}}</i></div>
              </div>
              <div *ngIf="walker && !application.rating && !walker.isOwner && application.consumer.id === (currentUser$ | async)?.id">
                <span class="pm-color-gray pm-font-14">Write a review</span>
                <button md-icon-button (click)="onReviewClick(application)">
                  <md-icon>rate_review</md-icon>
                </button>
              </div>
              <div class="pm-font-12 pm-color-gray pm-walker-review-date pm-walker-review-padding">
                {{formatDate(application.createdAt)}} - {{formatDate(application.finsihedAt)}}
              </div>
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
    
    .pm-walker-review-padding {
      padding-top: 10px;
    }

    .pm-walker-review-date {
      text-align: right;
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
