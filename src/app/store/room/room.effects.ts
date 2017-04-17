import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { RoomService } from '../../services/room/room.service';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

interface IRoomEffects {
  list$: Observable<Action>,
  create$: Observable<Action>
}

@Injectable()
export class RoomEffects implements IRoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService, private store: Store<fromRoot.State>) { }

  @Effect()
  public list$: Observable<Action> = this.actions$
    .ofType(roomAction.ActionTypes.LIST)
    .map((action: roomAction.ListAction) => action.payload)
    .switchMap(options => {
      return this.roomService.list(options)
        .map(response => new roomAction.ListCompleteAction(response))
        .catch(err => of(new roomAction.ListErrorAction(err)))
    });

  @Effect()
  public create$: Observable<Action> = this.actions$
    .ofType(roomAction.ActionTypes.CREATE)
    .map((action: roomAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this.roomService.create(options)
        .map(response => new roomAction.CreateCompleteAction(response))
        .catch(err => of(new roomAction.CreateErrorAction(err)))
    });
}
