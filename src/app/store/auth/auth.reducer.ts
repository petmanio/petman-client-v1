import { createSelector } from 'reselect';
import { ILoginResponse, IAuthCurrentUserResponse } from '../../models/api';
import * as authAction from './auth.actions';

export interface State {
  login?: {
    data: ILoginResponse,
    error?: any
  },
  user?: IAuthCurrentUserResponse
}

let initialState: State = {
  login: {
    data: null,
    error: null
  },
  user: null
};

export function reducer(state = initialState, action: authAction.Actions): State {
  switch (action.type) {
    case authAction.ActionTypes.LOGIN_COMPLETE: {
      const res: any = action.payload;
      //FIXME: why right interface gives an error
      return {
        login: { data: Object.assign({}, state.login.data, res) },
      };
    }

    case authAction.ActionTypes.LOGIN_ERROR: {
      const error: any = action.payload;
      return {
        login: { data: null, error: error.status || 'UNKNOWN_ERROR' },
      };
    }

    case authAction.ActionTypes.GET_CURRENT_USER_COMPLETE: {
      const res: any = action.payload;
      return Object.assign({}, {login: state.login, user: res});
    }

    case authAction.ActionTypes.LOGOUT_COMPLETE: {
      return {};
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getLogin = (state: State) => state.login;
export const getLoginData = login => login.data;
export const getLoginError = login => login.error;
export const getCurrentUser = (state: State) => state.user;
