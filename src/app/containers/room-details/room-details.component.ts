import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IRoom, IRoomApplication, IUser } from '../../models/api';
import { MdDialog, MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { RoomReviewsListDialogComponent } from '../../components/room-reviews-list-dialog/room-reviews-list-dialog.component';
import * as roomAction from '../../store/room/room.actions'
import * as fromRoot from '../../store';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs/Subject';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { NgxGalleryOptions } from 'ngx-gallery/lib/ngx-gallery-options.model';
import { UtilService } from '../../services/util/util.service';

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
  selectedUser$: Observable<IUser>;
  applications$: Observable<{total: number, list: IRoomApplication[]}>;
  room: IRoom;
  selectedUser: IUser;
  applications: {total: number, list: IRoomApplication[]};
  galleryOptions: NgxGalleryOptions[] = UtilService.galleryOptions;
  private _destroyed$ = new Subject<boolean>();
  private _actionsSubscription: Subscription;
  private _roomSubscription: Subscription;
  private _selectedUserSubscription: Subscription;
  private _applicationsSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute,
              private _dialog: MdDialog,
              private _router: Router,
              private _actions$: Actions,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this._actionsSubscription = _route.params
      .select<string>('roomId')
      .map(id => new roomAction.SelectAction(id))
      .subscribe(_store);

    this.room$ = this._store.select(fromRoot.getSelectedRoom);
    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
    this.applications$ = this._store.select(fromRoot.getSelectedRoomMyApplications);
    this._roomSubscription = this.room$.subscribe(room => {
      this.room = room;
      // TODO: check using resolvers
      if (this.room && !this.room.applicationsLoaded) {
        this._store.dispatch(new roomAction.ApplicationListAction({roomId: this.room.id}));
      }
    });
    this._selectedUserSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
    this._applicationsSubscription = this.applications$.subscribe(applications => this.applications = applications);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._actionsSubscription.unsubscribe();
    this._roomSubscription.unsubscribe();
    this._selectedUserSubscription.unsubscribe();
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
    if (this.selectedUser) {
      if (this.applications.list.some(application => application.status === 'WAITING')) {
        this._snackBar.open(this._translateService.instant('sorry_you_have_unfinished_application'), null, {
          duration: 3000
        });
      } else {
        this._store.dispatch(new roomAction.ApplyAction({roomId: this.room.id}));
      }
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}
