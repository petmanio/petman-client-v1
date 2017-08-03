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
import { AuthService } from '../../services/auth/auth.service';
import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';

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

interface IAuthEffects {
  fbLogin$: Observable<Action>,
  fbLoginComplete$: Observable<void>,
  login$: Observable<Action>,
  logout$: Observable<Action>,
  getCurrentUser$: Observable<Action>,
}

@Injectable()
export class AuthEffects implements IAuthEffects {
  @Effect()
  public fbLogin$: Observable<Action> = this._actions$
    .ofType(authAction.ActionTypes.FB_LOGIN)
    .map((action: authAction.FbLoginAction) => action.payload)
    .switchMap(options => {
      return this._authService.fbLogin()
        .map(response => new authAction.FbLoginSuccessAction(response))
        .catch(err => of(new authAction.LoginErrorAction(err)))
    });

  @Effect()
  public fbLoginComplete$: Observable<any> = this._actions$
    .ofType(authAction.ActionTypes.FB_LOGIN_SUCCESS)
    .map((action: authAction.FbLoginSuccessAction) => action.payload)
    .switchMap((options: any) => of(new authAction.LoginAction({fb: options})));

  @Effect()
  public login$: Observable<Action> = this._actions$
    .ofType(authAction.ActionTypes.LOGIN)
    .map((action: authAction.LoginAction) => action.payload)
    .switchMap(options => {
      return this._authService.login(options)
        .map(response => new authAction.LoginSuccessAction(response))
        .catch(err => of(new authAction.LoginErrorAction(err)))
    });

  @Effect()
  public logout$: Observable<Action> = this._actions$
    .ofType(authAction.ActionTypes.LOGOUT)
    // .map((action: authAction.LogoutAction) => action.payload)
    .switchMap(() => {
      return this._authService.logout()
        .map(result => new authAction.LogoutSuccessAction({}));
    });

  @Effect()
  public getCurrentUser$: Observable<Action> = this._actions$
    .ofType(authAction.ActionTypes.GET_CURRENT_USER)
    .map((action: authAction.GetCurrentUserAction) => action.payload)
    .switchMap(() => {
      return this._authService.getCurrentUser()
        .map(response => new authAction.GetCurrentUserSuccessAction(response))
        .catch(err => of(new authAction.GetCurrentUserErrorAction(err)))
    });

  constructor(private _actions$: Actions, private _authService: AuthService) { }
}
