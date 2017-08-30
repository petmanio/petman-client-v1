import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { IRoom, IUser } from '../../models/api';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export interface IRoomsComponent {
  onScroll(): void,
  onFabClick(): void
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy, IRoomsComponent {
  rooms$: Observable<IRoom[]>;
  selectedUser$: Observable<IUser>;
  rooms: IRoom[];
  total$: Observable<number>;
  total: number;
  selectedUser: IUser;
  private _destroyed$ = new Subject<boolean>();
  private _roomsSubscription: Subscription;
  private _selectedUserSubscription: Subscription;
  private _totalSubscription: Subscription;

  private _skip = 0;
  private _limit = 6;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this.rooms$ = this._store.select(fromRoot.getRoomAll);
    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
    this.total$ = this._store.select(fromRoot.getRoomTotalEntities);
    this._roomsSubscription = this.rooms$.subscribe(rooms => {
      this.rooms = rooms;
      if (!this._skip && rooms.length) {
        this._skip = rooms.length - 1;
      } else {
        this._skip = 0;
      }
    });
    this._totalSubscription = this.total$.subscribe(total => this.total = total);
    this._selectedUserSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._roomsSubscription.unsubscribe();
    this._totalSubscription.unsubscribe();
    this._selectedUserSubscription.unsubscribe();
  }

  onScroll(): void {
    if (this._skip + this._limit < this.total) {
      this._skip += this._limit;
      this._store.dispatch(new roomAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onFabClick(): void {
    if (this.selectedUser) {
      this._router.navigate(['/rooms/add'])
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}
