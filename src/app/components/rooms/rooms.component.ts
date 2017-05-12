import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { UtilService } from '../../services/util/util.service';

export interface IRoomsComponent {
  onScroll(): void
}

@Component({
  selector: 'app-rooms',
  template: `
    <div class="columns">
      <div class="column pm-became-host">
        <a md-button class="pm-fr" routerLink="/room/add">Became a sitter</a>
      </div>
    </div>
    <div class="columns">
      <div class="pm-room-items" infinite-scroll
           (scrolled)="onScroll()"
           [infiniteScrollDistance]="2"
           [infiniteScrollThrottle]="300"
           [scrollWindow]="false">
        <div class="column">
          <masonry [options]="{ transitionDuration: '0.8s', percentPosition: true, resize: true }"
                   [useImagesLoaded]="true" 
                   class="columns pm-width-100">
            <masonry-brick *ngFor="let room of (roomList$ | async)?.list" 
                           class="column is-4-desktop is-6-tablet">
              <app-room [room]="room"></app-room>
            </masonry-brick>
          </masonry>
        </div>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }

    .pm-became-host {
      overflow: hidden;
      padding-top: 10px;
      padding-bottom: 0;
    }
    
    .pm-room-items {
      overflow: auto;
      width: 100%;
    }
    .pm-room-items {
      height: calc(100vh - 114px);
      height: -webkit-calc(100vh - 114px);
      height: -moz-calc(100vh - 114px);
    }
    
    @media (max-width: 600px) and (orientation: portrait) {
     .pm-room-items {
        height: calc(100vh - 125px);
        height: -webkit-calc(100vh - 125px);
        height: -moz-calc(100vh - 125px);
      }
    }
  `]
})
export class RoomsComponent implements OnInit, IRoomsComponent {
  roomList$: Observable<any>;
  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.roomList$ = _store.select(fromRoot.getRoomList);
  }

  ngOnInit(): void {
    this._store.dispatch(new roomAction.ListClearAction({}));
    this._store.dispatch(new roomAction.ListAction({ limit: this._limit, skip: this._skip }));
    this.roomList$.subscribe($event => {
      this._count = $event.count;
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new roomAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }
}
