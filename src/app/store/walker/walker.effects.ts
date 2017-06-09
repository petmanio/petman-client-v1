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
import { WalkerService } from '../../services/walker/walker.service';
import * as walkerAction from '../../store/walker/walker.actions';

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

interface IWalkerEffects {
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
export class WalkerEffects implements IWalkerEffects {
  @Effect() getById$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.GET_BY_ID)
    .map((action: walkerAction.GetByIdAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.getById(options)
        .map(response => new walkerAction.GetByIdCompleteAction(response))
        .catch(err => of(new walkerAction.GetByIdErrorAction(err)))
    });

  @Effect() deleteById$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.DELETE_BY_ID)
    .map((action: walkerAction.DeleteByIdAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.deleteById(options)
        .map(response => new walkerAction.DeleteByIdCompleteAction(response))
        .catch(err => of(new walkerAction.DeleteByIdErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.LIST)
    .map((action: walkerAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.list(options)
        .map(response => new walkerAction.ListCompleteAction(response))
        .catch(err => of(new walkerAction.ListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.CREATE)
    .map((action: walkerAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.create(options)
        .map(response => new walkerAction.CreateCompleteAction(response))
        .catch(err => of(new walkerAction.CreateErrorAction(err)))
    });

  @Effect() apply$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.APPLY)
    .map((action: walkerAction.ApplyAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.apply(options)
        .map(response => new walkerAction.ApplyCompleteAction(response))
        .catch(err => of(new walkerAction.ApplyErrorAction(err)))
    });

  @Effect() updateApplication$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.UPDATE_APPLICATION)
    .map((action: walkerAction.UpdateApplicationAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.updateApplication(options)
        .map(response => new walkerAction.UpdateApplicationCompleteAction(response))
        .catch(err => of(new walkerAction.UpdateApplicationErrorAction(err)))
    });

  @Effect() applicationMessageList$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.APPLICATION_MESSAGE_LIST)
    .map((action: walkerAction.ApplicationMessageListAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.getApplicationMessageList(options)
        .map(response => new walkerAction.ApplicationMessageListCompleteAction(response))
        .catch(err => of(new walkerAction.ApplicationMessageListErrorAction(err)))
    });

  @Effect() applicationMessageCreate$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.APPLICATION_MESSAGE_CREATE)
    .map((action: walkerAction.ApplicationMessageCreateAction) => action.payload)
    .switchMap(options => {
      // TODO: check complete action
      return this._walkerService.applicationMessageCreate(options)
    });

  @Effect() shareOnFacebook$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.SHARE_ON_FACEBOOK)
    .map((action: walkerAction.ShareOnFacebookAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.shareOnFacebook(options)
        .map(response => new walkerAction.ShareOnFacebookCompleteAction(response))
        .catch(err => of(new walkerAction.ShareOnFacebookErrorAction(err)))
    });

  constructor(private _actions$: Actions,
              private _walkerService: WalkerService) {}

}
