import { createSelector } from 'reselect';
import { INotificationCountResponse, INotificationListRequest, INotificationListResponse } from '../../models/api';
import * as notificationAction from './notification.actions';

export interface State {
  count?: INotificationCountResponse,
  list?: INotificationListResponse,
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  count: {
    count: 0
  }
};

export function reducer(state = initialState, action: notificationAction.Actions): State {
  switch (action.type) {
    // TODO: use another action for loading more
    case notificationAction.ActionTypes.LIST_COMPLETE: {
      const res: INotificationListResponse = action.payload;
      // TODO: use object assign
      return {
        list: {
          list: state.list.list.concat(res.list),
          count: res.count
        }
      };
    }

    case notificationAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return {
        list: {
          list: [],
          count: null
        }
      };
    }

    // TODO: use another action for loading more
    case notificationAction.ActionTypes.LIST_CLEAR: {
      // TODO: use object assign
      return {
        list: {
          list: [],
          count: null
        }
      };
    }

    case notificationAction.ActionTypes.GET_COUNT_COMPLETE: {
      const res: INotificationCountResponse = action.payload;
      // TODO: use object assign
      return Object.assign({}, state, {count: res});
    }

    case notificationAction.ActionTypes.GET_COUNT_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {count: { count: 0 }})
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

export const getList = (state: State) => state.list;
export const getCount = (state: State) => state.count;

