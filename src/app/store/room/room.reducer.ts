import { createSelector } from 'reselect';
import { IRoomGetByIdResponse, IRoomListRequest, IRoomListResponse } from '../../models/api';
import * as roomAction from './room.actions';

export interface State {
  room?: IRoomGetByIdResponse,
  list?: IRoomListResponse,
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  room: null
};

export function reducer(state = initialState, action: roomAction.Actions): State {
  switch (action.type) {
    // TODO: use another action for loading more
    case roomAction.ActionTypes.LIST_COMPLETE: {
      const res: IRoomListResponse = action.payload;
      // TODO: use object assign
      return {
        list: {
          list: state.list.list.concat(res.list),
          count: res.count
        }
      };
    }

    case roomAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return {
        list: {
          list: [],
          count: null
        }
      };
    }

    // TODO: use another action for loading more
    case roomAction.ActionTypes.LIST_CLEAR: {
      // TODO: use object assign
      return {
        list: {
          list: [],
          count: null
        }
      };
    }

    case roomAction.ActionTypes.GET_BY_ID_COMPLETE: {
      const res: IRoomGetByIdResponse = action.payload;
      // TODO: use object assign
      return Object.assign({}, state, {room: res});
    }

    case roomAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {room: null})
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

