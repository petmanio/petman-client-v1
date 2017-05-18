import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { UtilService } from '../../services/util/util.service';
import { IUser } from '../../models/api';
import { MdSnackBar } from '@angular/material';

export interface IRoomsComponent {
  onScroll(): void,
  onFabClick(): void
}

@Component({
  selector: 'app-rooms',
  template: `
    <div class="columns">
      <div class="pm-room-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.5s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true" 
                   class="columns pm-width-100">
            <masonry-brick *ngFor="let room of (roomList$ | async)?.list" 
                           class="column is-4-desktop is-6-tablet">
              <app-room [room]="room"></app-room>
            </masonry-brick>
          </masonry>
        </div>
      </div>
      <button md-fab class="pm-fab" (click)="onFabClick()">
        <md-icon>add</md-icon>
      </button>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }

    .pm-room-items {
      overflow: auto;
      width: 100%;
      height: calc(100vh - 70px);
      height: -webkit-calc(100vh - 70px);
      height: -moz-calc(100vh - 70px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
     .pm-room-items {
       height: calc(100vh - 60px);
       height: -webkit-calc(100vh - 60px);
       height: -moz-calc(100vh - 60px);
      }
    }
  `]
})
export class RoomsComponent implements OnInit, IRoomsComponent {
  roomList$: Observable<any>;
  currentUser$: Observable<any>;
  currentUser: IUser;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _snackBar: MdSnackBar) {
    this.roomList$ = _store.select(fromRoot.getRoomList);
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    this._store.dispatch(new roomAction.ListClearAction({}));
    this._store.dispatch(new roomAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.roomList$.subscribe($event => {
      this._count = $event.count;
    });

    this.currentUser$.subscribe($event => this.currentUser = $event);
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new roomAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onFabClick(): void {
    if (this.currentUser) {
      this._router.navigate(['/rooms/add'])
    } else {
      this._snackBar.open(`Please login to add new statement`, null, {
        duration: 3000
      });
    }
  }
}
