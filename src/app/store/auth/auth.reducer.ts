import { createSelector } from 'reselect';
import { assign, find } from 'lodash';
import { IAuthCurrentUserResponse, ILoginResponse } from '../../models/api';
import * as authAction from './auth.actions';

export interface State {
  user?: IAuthCurrentUserResponse,
  selectedUserId: number
}

const initialState: State = {
  user: null,
  selectedUserId: null
};

export function reducer(state = initialState, action: authAction.Actions): State {
  switch (action.type) {
    case authAction.ActionTypes.LOGIN_SUCCESS: {
      const res: ILoginResponse = action.payload;
      return assign({}, state, { user: res.user });
    }

    case authAction.ActionTypes.LOGIN_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { user: null });
    }

    case authAction.ActionTypes.GET_CURRENT_USER_SUCCESS: {
      const res: IAuthCurrentUserResponse = action.payload;
      return assign({}, state, { user: res });
    }

    case authAction.ActionTypes.LOGOUT_SUCCESS: {
      return assign({}, state, { user: null });
    }

    case authAction.ActionTypes.CHANGE_CURRENT_USER: {
      return assign({}, state, { selectedUserId: action.payload});
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

export const getCurrentUser = (state: State) => state.user;
export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getSelectedUser = createSelector(getCurrentUser, getSelectedUserId, (user, userId) => {
  const internalUser = find(user ? user.internalUsers : [], {id: userId});
  return internalUser || user;
});
