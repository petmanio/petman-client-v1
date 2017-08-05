import { Component, ElementRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface IReviewDialogComponent {
  close(): void
  apply($event): void
}

@Component({
  selector: 'app-walker-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements IReviewDialogComponent {
  reviewOptions = {
    review: '',
    rating: 0
  };
  constructor(public dialogRef: MdDialogRef<ReviewDialogComponent>, private ref: ElementRef) {

  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close(this.reviewOptions)
  }
}
