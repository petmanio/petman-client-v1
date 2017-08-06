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
  load$: Observable<Action>,
  loadSuccess$: Observable<Action>,
  delete$: Observable<Action>,
  list$: Observable<Action>,
  applicationList$: Observable<Action>,
  create$: Observable<Action>,
  apply$: Observable<Action>,
  updateApplicationStatus$: Observable<Action>,
  rateApplication$: Observable<Action>,
}

@Injectable()
export class WalkerEffects implements IWalkerEffects {
  @Effect() load$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.LOAD)
    .map((action: walkerAction.LoadAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.getById(options)
        .map(response => new walkerAction.LoadSuccessAction(response))
        .catch(err => of(new walkerAction.LoadErrorAction(err)))
    });

  @Effect() loadSuccess$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.LOAD_SUCCESS)
    .map((action: walkerAction.LoadSuccessAction) => action.payload)
    .map(options => {
      return new walkerAction.ApplicationListAction({walkerId: options.id})
    });

  @Effect() delete$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.DELETE)
    .map((action: walkerAction.DeleteAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.deleteById(options)
        .map(response => new walkerAction.DeleteSuccessAction({walkerId: options.walkerId}))
        .catch(err => of(new walkerAction.DeleteErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.LIST)
    .map((action: walkerAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.list(options)
        .map(response => new walkerAction.ListSuccessAction(response))
        .catch(err => of(new walkerAction.ListErrorAction(err)))
    });

  @Effect() applicationList$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.APPLICATION_LIST)
    .map((action: walkerAction.ApplicationListAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.applicationList(options)
        .map(response => {
          response.walkerId = options.walkerId;
          return new walkerAction.ApplicationListSuccessAction(response)
        })
        .catch(err => of(new walkerAction.ApplicationListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.CREATE)
    .map((action: walkerAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.create(options)
        .map(response => new walkerAction.CreateSuccessAction(response))
        .catch(err => of(new walkerAction.CreateErrorAction(err)))
    });

  @Effect() apply$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.APPLY)
    .map((action: walkerAction.ApplyAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.apply(options)
        .map(response => new walkerAction.ApplySuccessAction(response))
        .catch(err => of(new walkerAction.ApplyErrorAction(err)))
    });

  @Effect() updateApplicationStatus$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.UPDATE_APPLICATION_STATUS)
    .map((action: walkerAction.UpdateApplicationStatusAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.updateApplicationStatus(options)
        .map(response => new walkerAction.UpdateApplicationStatusSuccessAction(options))
        .catch(err => of(new walkerAction.UpdateApplicationStatusErrorAction(err)))
    });

  @Effect() rateApplication$: Observable<Action> = this._actions$
    .ofType(walkerAction.ActionTypes.RATE_APPLICATION)
    .map((action: walkerAction.RateApplicationAction) => action.payload)
    .switchMap(options => {
      return this._walkerService.rateApplication(options)
        .map(response => new walkerAction.RateApplicationSuccessAction(options))
        .catch(err => of(new walkerAction.RateApplicationErrorAction(err)))
    });


  constructor(private _actions$: Actions,
              private _walkerService: WalkerService) {}

}
