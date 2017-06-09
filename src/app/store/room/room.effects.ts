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
  getById$: Observable<Action>,
  deleteById$: Observable<Action>,
  list$: Observable<Action>,
  create$: Observable<Action>,
  apply$: Observable<Action>,
  updateApplication$: Observable<Action>,
  applicationMessageList$: Observable<Action>,
  applicationMessageCreate$: Observable<Action>,
  shareOnFacebook$: Observable<Action>
}

@Injectable()
export class RoomEffects implements IRoomEffects {
  @Effect() getById$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.GET_BY_ID)
    .map((action: roomAction.GetByIdAction) => action.payload)
    .switchMap(options => {
      return this._roomService.getById(options)
        .map(response => new roomAction.GetByIdCompleteAction(response))
        .catch(err => of(new roomAction.GetByIdErrorAction(err)))
    });

  @Effect() deleteById$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.DELETE_BY_ID)
    .map((action: roomAction.DeleteByIdAction) => action.payload)
    .switchMap(options => {
      return this._roomService.deleteById(options)
        .map(response => new roomAction.DeleteByIdCompleteAction(response))
        .catch(err => of(new roomAction.DeleteByIdErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.LIST)
    .map((action: roomAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._roomService.list(options)
        .map(response => new roomAction.ListCompleteAction(response))
        .catch(err => of(new roomAction.ListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.CREATE)
    .map((action: roomAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._roomService.create(options)
        .map(response => new roomAction.CreateCompleteAction(response))
        .catch(err => of(new roomAction.CreateErrorAction(err)))
    });

  @Effect() apply$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.APPLY)
    .map((action: roomAction.ApplyAction) => action.payload)
    .switchMap(options => {
      return this._roomService.apply(options)
        .map(response => new roomAction.ApplyCompleteAction(response))
        .catch(err => of(new roomAction.ApplyErrorAction(err)))
    });

  @Effect() updateApplication$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.UPDATE_APPLICATION)
    .map((action: roomAction.UpdateApplicationAction) => action.payload)
    .switchMap(options => {
      return this._roomService.updateApplication(options)
        .map(response => new roomAction.UpdateApplicationCompleteAction(response))
        .catch(err => of(new roomAction.UpdateApplicationErrorAction(err)))
    });

  @Effect() applicationMessageList$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.APPLICATION_MESSAGE_LIST)
    .map((action: roomAction.ApplicationMessageListAction) => action.payload)
    .switchMap(options => {
      return this._roomService.getApplicationMessageList(options)
        .map(response => new roomAction.ApplicationMessageListCompleteAction(response))
        .catch(err => of(new roomAction.ApplicationMessageListErrorAction(err)))
    });

  @Effect() applicationMessageCreate$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.APPLICATION_MESSAGE_CREATE)
    .map((action: roomAction.ApplicationMessageCreateAction) => action.payload)
    .switchMap(options => {
      // TODO: check complete action
      return this._roomService.applicationMessageCreate(options)
    });

  @Effect() shareOnFacebook$: Observable<Action> = this._actions$
    .ofType(roomAction.ActionTypes.SHARE_ON_FACEBOOK)
    .map((action: roomAction.ShareOnFacebookAction) => action.payload)
    .switchMap(options => {
      return this._roomService.shareOnFacebook(options)
        .map(response => new roomAction.ShareOnFacebookCompleteAction(response))
        .catch(err => of(new roomAction.ShareOnFacebookErrorAction(err)))
    });

  constructor(private _actions$: Actions,
              private _roomService: RoomService) {}

}
