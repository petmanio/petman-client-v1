import { assign } from 'lodash';
import {
  ILostFoundCommentCreateEventResponse,
  ILostFoundCommentListResponse,
  ILostFoundGetByIdResponse,
  ILostFoundListResponse
} from '../../models/api';
import * as lostFoundAction from './lostFound.actions';

export interface State {
  lostFound: ILostFoundGetByIdResponse,
  list: ILostFoundListResponse,
  comments: ILostFoundCommentListResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  lostFound: null,
  comments: {
    total: null,
    list: []
  }
};

export function reducer(state = initialState, action: lostFoundAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case lostFoundAction.ActionTypes.LIST_SUCCESS: {
      const res: ILostFoundListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case lostFoundAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case lostFoundAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
    }

    /**
     * Get By Id
     */
    case lostFoundAction.ActionTypes.GET_BY_ID_SUCCESS: {
      const res: ILostFoundGetByIdResponse = action.payload;
      // TODO: use object assign
      return assign({}, state, {lostFound: res});
    }

    case lostFoundAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return assign({}, state, {lostFound: null})
    }

    case lostFoundAction.ActionTypes.GET_BY_ID_CLEAR: {
      const error: any = action.payload;
      return assign({}, state, {lostFound: null})
    }

    /**
     * Comment List
     */
    // TODO: use another action for loading more
    case lostFoundAction.ActionTypes.COMMENT_LIST_SUCCESS: {
      const res: ILostFoundCommentListResponse = action.payload;
      return assign({}, state, { comments: { total: res.total, list: res.list } });
    }

    case lostFoundAction.ActionTypes.COMMENT_LIST_ERROR: {
      return assign({}, state, { comments: { total: null, list: [] } });
    }

    // TODO: use another action for loading more
    case lostFoundAction.ActionTypes.COMMENT_LIST_LOAD_MORE_SUCCESS: {
      const res: ILostFoundCommentListResponse = action.payload;
      return assign({}, state, { comments: { total: state.comments.total, list: state.comments.list.concat(res.list) } });
    }

    /**
     * Comment Create Event
     */
    case lostFoundAction.ActionTypes.COMMENT_CREATE_EVENT: {
      const res: ILostFoundCommentCreateEventResponse = action.payload;
      // TODO: remove if check
      if (res.lostFound === state.lostFound.id) {
        return assign({}, state, { comments: { total: state.comments.total + 1, list: [res].concat(state.comments.list) } });
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
export const getLostFound = (state: State) => state.lostFound;
export const getComments = (state: State) => state.comments;

