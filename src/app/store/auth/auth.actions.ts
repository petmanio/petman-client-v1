import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  ILoginRequest,
  ILoginResponse,
  IFbLoginRequest,
  IFbLoginResponse,
  IAuthCurrentUserRequest
} from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_ERROR: type('[Auth] Login Error'),

  FB_LOGIN: type('[Auth] Fb Login'),
  FB_LOGIN_SUCCESS: type('[Auth] Fb Login Success'),
  FB_LOGIN_ERROR: type('[Auth] Fb Login Error'),

  GET_CURRENT_USER: type('[Auth] Get Current User'),
  GET_CURRENT_USER_SUCCESS: type('[Auth] Get Current User Success'),
  GET_CURRENT_USER_ERROR: type('[Auth] Get Current User Error'),

  LOGOUT: type('[Auth] Logout'),
  LOGOUT_SUCCESS: type('[Auth] Logout Success'),
  LOGOUT_ERROR: type('[Auth] Logout Error'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: ILoginRequest) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: ILoginResponse) { }
}

export class LoginErrorAction implements Action {
  type = ActionTypes.LOGIN_ERROR;

  constructor(public payload: any) { }
}

export class FbLoginAction implements Action {
  type = ActionTypes.FB_LOGIN;

  constructor(public payload?: IFbLoginRequest) { }
}

export class FbLoginSuccessAction implements Action {
  type = ActionTypes.FB_LOGIN_SUCCESS;

  constructor(public payload: IFbLoginResponse) { }
}

export class FbLoginErrorAction implements Action {
  type = ActionTypes.FB_LOGIN_ERROR;

  constructor(public payload: any) { }
}

export class GetCurrentUserAction implements Action {
  type = ActionTypes.GET_CURRENT_USER;

  constructor(public payload: IAuthCurrentUserRequest) { }
}

export class GetCurrentUserSuccessAction implements Action {
  type = ActionTypes.GET_CURRENT_USER_SUCCESS;

  constructor(public payload: IAuthCurrentUserRequest) { }
}

export class GetCurrentUserErrorAction implements Action {
  type = ActionTypes.GET_CURRENT_USER_ERROR;

  constructor(public payload: IAuthCurrentUserRequest) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: any) { }
}

export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;

  constructor(public payload: any) { }
}

export class LogoutErrorAction implements Action {
  type = ActionTypes.LOGOUT_ERROR;

  constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | FbLoginAction
  | FbLoginSuccessAction
  | FbLoginErrorAction
  | GetCurrentUserAction
  | GetCurrentUserSuccessAction
  | GetCurrentUserErrorAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutErrorAction;
