import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { UtilService } from '../../services/util/util.service';

export interface IRoomDetailsComponent {

}

@Component({
  selector: 'app-room-details',
  template: `
    <md-card class="room-card">
      <md-card-content>
        <p class="pm-font-bold">
          {{(roomRoom$ | async)?.cost}}$ / day
        </p>
        <p class="pm-room-description pm-font-16">{{(roomRoom$ | async)?.description}}</p>
      </md-card-content>
    </md-card>
  `,
  styles: [`
   
  `]
})
export class RoomDetailsComponent implements OnInit, OnChanges, IRoomDetailsComponent {
  // TODO: update attribute name
  roomRoom$: Observable<any>;
  private _roomId: number;
  constructor(private _store: Store<fromRoot.State>, private _activatedRoute: ActivatedRoute, private _utilService: UtilService) {
    this.roomRoom$ = _store.select(fromRoot.getRoomRoom);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._activatedRoute.params.subscribe((params: Params) => {
      this._roomId = parseInt(params['roomId'], 10);
      if (!this._roomId) {
        // TODO: use global error handling
        throw new Error('RoomDetailsComponent: roomId is not defined');
      }
      return this._store.dispatch(new roomAction.GetByIdAction({roomId: this._roomId}))
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
