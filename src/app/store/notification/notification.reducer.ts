import { assign, cloneDeep, map } from 'lodash';
import { INotification, INotificationListResponse, INotificationSeenResponse } from '../../models/api';
import * as notificationAction from './notification.actions';

export interface State {
  list: INotificationListResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  }
};

export function reducer(state = initialState, action: notificationAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case notificationAction.ActionTypes.LIST_SUCCESS: {
      const res: INotificationListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case notificationAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case notificationAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
    }

    /**
     * Seen
     */
    case notificationAction.ActionTypes.SEEN_SUCCESS: {
      const res: INotificationSeenResponse = action.payload;
      let list = cloneDeep(state.list.list);
      list = map(list, item => {
        if (res.notifications.indexOf(item.id) !== -1) {
          item.seen = true;
        }
        return item;
      });
      return assign({}, state, { list: { list: list, count: state.list.count }});
    }

    // TODO: error reducer

    /**
     * Notification New
     */
    case notificationAction.ActionTypes.NOTIFICATION_NEW_EVENT: {
      const res: INotification = action.payload;
      return assign({}, state, { list: { list: [res].concat(state.list.list), count: state.list.count + 1}});
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

