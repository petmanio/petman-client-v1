import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IRoom, IRoomApplication } from '../../models/api';
import { MdDialog } from '@angular/material';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { RoomReviewsListDialogComponent } from '../../components/room-reviews-list-dialog/room-reviews-list-dialog.component';
import * as roomAction from '../../store/room/room.actions'
import * as fromRoot from '../../store';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs/Subject';
import { Actions } from '@ngrx/effects';

export interface IRoomDetailsComponent {
  onShareClick(): void,
  onSeeReviewsClick(): void,
  onDeleteClick(): void
}

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, OnDestroy, IRoomDetailsComponent {
  room$: Observable<IRoom>;
  applications$: Observable<{total: number, list: IRoomApplication[]}>;
  room: IRoom;
  applications: {total: number, list: IRoomApplication[]};
  private _destroyed$ = new Subject<boolean>();
  private _actionsSubscription: Subscription;
  private _roomSubscription: Subscription;
  private _applicationsSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute,
              private _dialog: MdDialog,
              private _router: Router,
              private _actions$: Actions) {
    this._actionsSubscription = _route.params
      .select<string>('roomId')
      .map(id => new roomAction.SelectAction(id))
      .subscribe(_store);
  }

  ngOnInit() {
    this.room$ = this._store.select(fromRoot.getSelectedRoom);
    this.applications$ = this._store.select(fromRoot.getSelectedRoomMyApplications);
    this._roomSubscription = this.room$.subscribe(room => this.room = room);
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._actionsSubscription.unsubscribe();
    this._roomSubscription.unsubscribe();
    this._applicationsSubscription.unsubscribe();
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'share',
            href: `${location.origin}/rooms/${this.room.id}/details`,
            hashtag: '#Petman'
          };

          FB.ui(fbShareOptions, response => {});
        }
      }
    });
  }

  onSeeReviewsClick(): void {
    const _dialogRef = this._dialog.open(RoomReviewsListDialogComponent);
    _dialogRef.componentInstance.roomId = this.room.id
  }

  onDeleteClick(): void {
    const _dialogRef = this._dialog.open(ConfirmDialogComponent);
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._store.dispatch(new roomAction.DeleteAction({roomId: this.room.id}));
        this._actions$
          .ofType(roomAction.ActionTypes.DELETE_SUCCESS)
          .takeUntil(this._destroyed$)
          .do(() => this._router.navigate(['rooms']))
          .subscribe();
      }
    });
  }

  onApplyClick(): void {
    // if (this.inProgressApplications.some(application => application.status === 'WAITING')) {
    //   this._snackBar.open(this._translateService.instant('sorry_you_have_unfinished_application'), null, {
    //     duration: 3000
    //   });
    // } else if (!this.currentUser) {
    //   this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
    //     duration: 3000
    //   })
    //     .onAction()
    //     .subscribe($event => this._router.navigate(['/join']))
    // } else {
    //   this._store.dispatch(new roomAction.ApplyAction({roomId: this._roomId}));
    // }
  }
}
