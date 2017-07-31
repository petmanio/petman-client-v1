import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { IReview, IRoomApplication } from '../../models/api';
import * as fromRoot from '../../store';
import { UtilService } from '../../services/util/util.service';

export interface IRoomReviewsListDialogComponent {
  setPageData(): void
}

@Component({
  selector: 'app-room-reviews-list-dialog',
  templateUrl: './room-reviews-list-dialog.component.html',
  styleUrls: ['./room-reviews-list-dialog.component.scss']
})
export class RoomReviewsListDialogComponent implements OnInit, IRoomReviewsListDialogComponent {
  limit = 2;
  skip = 0;
  roomId: number;
  reviewList: { total: number, list: IRoomApplication[] };
  currentPageData: IReview[] = [];
  constructor(public dialogRef: MdDialogRef<RoomReviewsListDialogComponent>, private _store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this._store.select(fromRoot.getSelectedRoomReviews)
      .subscribe(entities => {
        this.reviewList = entities;
        this.setPageData()
      });
  }

  setPageData(): void {
    this.currentPageData = UtilService.convertApplicationsListToReviews(this.reviewList.list.slice(this.skip, this.skip + this.limit));
  }
}
