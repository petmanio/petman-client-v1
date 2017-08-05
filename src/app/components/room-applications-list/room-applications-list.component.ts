import { Component, Input, OnInit } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { Store } from '@ngrx/store';
import * as roomAction from '../../store/room/room.actions'
import * as fromRoot from '../../store';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { MdDialog } from '@angular/material';

export interface IRoomApplicationsListComponent {
  checkApplicationsStatus(application: IRoomApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean,
  onChangeStatus(application: IRoomApplication, status: string): void,
  onRateClick(application: IRoomApplication): void
}

@Component({
  selector: 'app-room-applications-list',
  templateUrl: './room-applications-list.component.html',
  styleUrls: ['./room-applications-list.component.scss']

})
export class RoomApplicationsListComponent implements OnInit, IRoomApplicationsListComponent {
  @Input() applications: IRoomApplication[];
  @Input() room: IRoom;
  activeApplicationId: number;
  constructor(private _store: Store<fromRoot.State>, private _dialog: MdDialog) {

  }

  ngOnInit(): void {

  }

  checkApplicationsStatus(application: IRoomApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean {
    let status = false;
    switch (condition) {
      case 'IN_PROGRESS':
        status = application.status === 'IN_PROGRESS';
        break;
      case 'WAITING':
        status = application.status === 'WAITING';
        break;
      case 'FINISHED':
        status = ['CANCELED_BY_PROVIDER', 'CANCELED_BY_CONSUMER', 'FINISHED'].indexOf(application.status) !== -1;
        break;
    }

    return status;
  }

  onChangeStatus(application: IRoomApplication, status: string): void {
    // TODO: try to user without <any> type
    const roomId: any = application.room;
    this._store.dispatch(new roomAction.UpdateApplicationStatusAction({roomId, status, applicationId: application.id}));
  }

  onRateClick(application: IRoomApplication): void {
    const _dialogRef = this._dialog.open(ReviewDialogComponent);
    _dialogRef.afterClosed().subscribe(reviewOptions => {
      if (reviewOptions) {
        // TODO: try to user without <any> type
        const roomId: any = application.room;
        this._store.dispatch(new roomAction.RateApplicationAction({
          roomId,
          applicationId: application.id,
          rating: reviewOptions.rating,
          review: reviewOptions.review
        }));
      }
    });
  }
}
