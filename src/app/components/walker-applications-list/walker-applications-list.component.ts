import { Component, Input, OnInit } from '@angular/core';
import { IWalker, IWalkerApplication } from '../../models/api';
import { Store } from '@ngrx/store';
import * as walkerAction from '../../store/walker/walker.actions'
import * as fromRoot from '../../store';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { MdDialog } from '@angular/material';

export interface IWalkerApplicationsListComponent {
  checkApplicationsStatus(application: IWalkerApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean,
  onChangeStatus(application: IWalkerApplication, status: string): void,
  onRateClick(application: IWalkerApplication): void
}

@Component({
  selector: 'app-walker-applications-list',
  templateUrl: './walker-applications-list.component.html',
  styleUrls: ['./walker-applications-list.component.scss']

})
export class WalkerApplicationsListComponent implements OnInit, IWalkerApplicationsListComponent {
  @Input() applications: IWalkerApplication[];
  @Input() walker: IWalker;
  activeApplicationId: number;
  constructor(private _store: Store<fromRoot.State>, private _dialog: MdDialog) {

  }

  ngOnInit(): void {

  }

  checkApplicationsStatus(application: IWalkerApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean {
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

  onChangeStatus(application: IWalkerApplication, status: string): void {
    // TODO: try to user without <any> type
    const walkerId: any = application.walker;
    this._store.dispatch(new walkerAction.UpdateApplicationStatusAction({walkerId, status, applicationId: application.id}));
  }

  onRateClick(application: IWalkerApplication): void {
    const _dialogRef = this._dialog.open(ReviewDialogComponent);
    _dialogRef.afterClosed().subscribe(reviewOptions => {
      if (reviewOptions) {
        // TODO: try to user without <any> type
        const walkerId: any = application.walker;
        this._store.dispatch(new walkerAction.RateApplicationAction({
          walkerId,
          applicationId: application.id,
          rating: reviewOptions.rating,
          review: reviewOptions.review
        }));
      }
    });
  }
}
