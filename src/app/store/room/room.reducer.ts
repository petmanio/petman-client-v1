import { assign, clone, findIndex, pick, cloneDeep } from 'lodash';
import {
  IRoomApplication,
  IRoomApplicationMessageCreateEventResponse,
  IRoomApplicationMessageListResponse,
  IRoomGetByIdResponse,
  IRoomListResponse,
  IRoomUpdateApplicationRequest
} from '../../models/api';
import * as roomAction from './room.actions';

export interface State {
  room: IRoomGetByIdResponse,
  list: IRoomListResponse,
  applicationMessageList: IRoomApplicationMessageListResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  room: null,
  applicationMessageList: {
    list: [],
    count: null
  }
};

export function reducer(state = initialState, action: roomAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case roomAction.ActionTypes.LIST_COMPLETE: {
      const res: IRoomListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case roomAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case roomAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
    }

    /**
     * Get By Id
     */
    case roomAction.ActionTypes.GET_BY_ID_COMPLETE: {
      const res: IRoomGetByIdResponse = action.payload;
      // TODO: use object assign
      return Object.assign({}, state, {room: res});
    }

    case roomAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {room: null})
    }

    /**
     * Application Apply
     * TODO: get room application separately, store into applications
     */
    case roomAction.ActionTypes.APPLY_COMPLETE: {
      const res: IRoomApplication = action.payload;
      if (res.room !== state.room.id) {
        return state
      } else {
        const room = cloneDeep(state.room);
        room.applications.unshift(res);
        return Object.assign({}, state, { room });
      }
    }

    /**
     * Update Application
     */
    case roomAction.ActionTypes.UPDATE_APPLICATION_COMPLETE: {
      const res: IRoomUpdateApplicationRequest = action.payload;
      const applicationIndex = findIndex(state.room.applications, (application) => application.id === res.id);
      // TODO: without clone
      const applications = clone(state.room.applications);
      if (applicationIndex !== -1) {
        // TODO: merge full object
        applications[applicationIndex] = assign({}, state.room.applications[applicationIndex], pick(res,
          ['status', 'review', 'rating', 'finishedAt']));
      }
      const room = Object.assign({}, state.room, { applications });
      return Object.assign({}, state, { room: room })
    }

    case roomAction.ActionTypes.UPDATE_APPLICATION_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {})
    }

    /**
     * Application Message List
     */
    // TODO: use another action for loading more
    case roomAction.ActionTypes.APPLICATION_MESSAGE_LIST_COMPLETE: {
      const res: IRoomApplicationMessageListResponse = action.payload;
      if (res.list.length && state.room.id === res.list[0].room) {
        return assign({}, state, { applicationMessageList: { list: state.applicationMessageList.list.concat(res.list), count: res.count }});
      }
      return state;
    }

    case roomAction.ActionTypes.APPLICATION_MESSAGE_LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { applicationMessageList: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case roomAction.ActionTypes.APPLICATION_MESSAGE_LIST_CLEAR: {
      return assign({}, state, { applicationMessageList: { list: [], count: null }});
    }

    /**
     * Application Message Create Event
     */
    // TODO: refactor and use room state for keeping messages
    case roomAction.ActionTypes.APPLICATION_MESSAGE_CREATE_EVENT: {
      const res: IRoomApplicationMessageCreateEventResponse = action.payload;
      if (state.room.id === res.room) {
        return assign({}, state, { applicationMessageList: { list: state.applicationMessageList.list.concat([res]), count: null }});
      }
      return state;
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
export const getRoom = (state: State) => state.room;
export const getApplicationMessageList = (state: State) => state.applicationMessageList;

