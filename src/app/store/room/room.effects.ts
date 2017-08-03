import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { RoomService } from '../../services/room/room.service';
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
  load$: Observable<Action>,
  loadSuccess$: Observable<Action>,
  delete$: Observable<Action>,
  list$: Observable<Action>,
  applicationList$: Observable<Action>,
  create$: Observable<Action>,
  apply$: Observable<Action>,
  updateApplicationStatus$: Observable<Action>,
}

@Injectable()
export class RoomEffects implements IRoomEffects {
  @Effect() load$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.LOAD)
    .map((action: roomAction.LoadAction) => action.payload)
    .switchMap(options => {
      return this._roomService.getById(options)
        .map(response => new roomAction.LoadSuccessAction(response))
        .catch(err => of(new roomAction.LoadErrorAction(err)))
    });

  @Effect() loadSuccess$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.LOAD_SUCCESS)
    .map((action: roomAction.LoadSuccessAction) => action.payload)
    .map(options => {
      return new roomAction.ApplicationListAction({roomId: options.id})
    });

  @Effect() delete$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.DELETE)
    .map((action: roomAction.DeleteAction) => action.payload)
    .switchMap(options => {
      return this._roomService.deleteById(options)
        .map(response => new roomAction.DeleteSuccessAction({roomId: options.roomId}))
        .catch(err => of(new roomAction.DeleteErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.LIST)
    .map((action: roomAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._roomService.list(options)
        .map(response => new roomAction.ListSuccessAction(response))
        .catch(err => of(new roomAction.ListErrorAction(err)))
    });

  @Effect() applicationList$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.APPLICATION_LIST)
    .map((action: roomAction.ApplicationListAction) => action.payload)
    .switchMap(options => {
      return this._roomService.applicationList(options)
        .map(response => {
          response.roomId = options.roomId;
          return new roomAction.ApplicationListSuccessAction(response)
        })
        .catch(err => of(new roomAction.ApplicationListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.CREATE)
    .map((action: roomAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._roomService.create(options)
        .map(response => new roomAction.CreateSuccessAction(response))
        .catch(err => of(new roomAction.CreateErrorAction(err)))
    });

  @Effect() apply$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.APPLY)
    .map((action: roomAction.ApplyAction) => action.payload)
    .switchMap(options => {
      return this._roomService.apply(options)
        .map(response => new roomAction.ApplySuccessAction(response))
        .catch(err => of(new roomAction.ApplyErrorAction(err)))
    });

  @Effect() updateApplicationStatus$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.UPDATE_APPLICATION_STATUS)
    .map((action: roomAction.UpdateApplicationStatusAction) => action.payload)
    .switchMap(options => {
      return this._roomService.updateApplicationStatus(options)
        .map(response => new roomAction.UpdateApplicationStatusSuccessAction(options))
        .catch(err => of(new roomAction.UpdateApplicationStatusErrorAction(err)))
    });


  constructor(private _actions$: Actions,
              private _roomService: RoomService) {}

}
