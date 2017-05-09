import { Component, ElementRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IWalkerReviewDialogComponent {
  close(): void
  apply($event): void
}

@Component({
  selector: 'app-walker-review-dialog',
  template: `
    <div class="walker-review-dialog">
      <div class="columns">
        <div class="column">
          <md-input-container>
            <input mdInput type="text" autocomplete="off" placeholder="Review" [(ngModel)]="reviewOptions.review">
          </md-input-container>
        </div>
      </div>
      <div class="columns">
        <div class="column pm-review-rating">
          <rating [(ngModel)]="reviewOptions.rating"
                  [max]="5"
                  fullIcon="★"
                  emptyIcon="☆"
                  [readonly]="false"
                  [disabled]="false"
                  [required]="true"
                  [float]="false"
                  [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
        </div>
      </div>
      <div class="column">
        <button (click)="close()" md-button>Close</button>
        <button md-button (click)="apply()" [disabled]="!reviewOptions.rating">Apply</button>
      </div>
    </div>
  `,
  styles: [`
    .walker-review-dialog {
      overflow: hidden;
    }
    
    .pm-review-rating {
      text-align: center;
    }

    /deep/ .pm-review-rating .star-icon {
       font-size: 35px !important;
     }
    }
  `]
})
export class WalkerReviewDialogComponent implements IWalkerReviewDialogComponent {
  reviewOptions = {
    review: '',
    rating: 0
  };
  constructor(public dialogRef: MdDialogRef<WalkerReviewDialogComponent>, private ref: ElementRef) {

  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close(this.reviewOptions)
  }
}