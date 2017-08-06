import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { IReview, IWalkerApplication } from '../../models/api';
import * as fromRoot from '../../store';
import { UtilService } from '../../services/util/util.service';

export interface IWalkerReviewsListDialogComponent {
  setPageData(): void
}

@Component({
  selector: 'app-walker-reviews-list-dialog',
  templateUrl: './walker-reviews-list-dialog.component.html',
  styleUrls: ['./walker-reviews-list-dialog.component.scss']
})
export class WalkerReviewsListDialogComponent implements OnInit, IWalkerReviewsListDialogComponent {
  limit = 5;
  skip = 0;
  walkerId: number;
  reviewList: { total: number, list: IWalkerApplication[] };
  currentPageData: IReview[] = [];
  constructor(public dialogRef: MdDialogRef<WalkerReviewsListDialogComponent>, private _store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this._store.select(fromRoot.getSelectedWalkerReviews)
      .subscribe(entities => {
        this.reviewList = entities;
        this.setPageData()
      });
  }

  setPageData(): void {
    this.currentPageData = UtilService.convertApplicationsListToReviews(this.reviewList.list.slice(this.skip, this.skip + this.limit));
  }
}
