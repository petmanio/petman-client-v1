import { assign, clone } from 'lodash';
import { IAdoptCommentCreateEventResponse, IAdoptCommentListResponse, IAdoptGetByIdResponse, IAdoptListResponse } from '../../models/api';
import * as adoptAction from './adopt.actions';

export interface State {
  adopt: IAdoptGetByIdResponse,
  list: IAdoptListResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  adopt: null
};

export function reducer(state = initialState, action: adoptAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case adoptAction.ActionTypes.LIST_COMPLETE: {
      const res: IAdoptListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case adoptAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case adoptAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
    }

    /**
     * Get By Id
     */
    case adoptAction.ActionTypes.GET_BY_ID_COMPLETE: {
      const res: IAdoptGetByIdResponse = action.payload;
      // TODO: use object assign
      return assign({}, state, {adopt: res});
    }

    case adoptAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return assign({}, state, {adopt: null})
    }

    /**
     * Comment List
     */
    // TODO: use another action for loading more
    case adoptAction.ActionTypes.COMMENT_LIST_COMPLETE: {
      const res: IAdoptCommentListResponse = action.payload;
      if (res.adoptId === state.adopt.id) {
        const adopt = clone(state.adopt);
        adopt.commentsCount = res.count;
        adopt.comments = adopt.comments.concat(res.list);
        return assign({}, state, { adopt });
      }
      return state;
    }

    case adoptAction.ActionTypes.COMMENT_LIST_ERROR: {
      const error: any = action.payload;
      const adopt = clone(state.adopt);
      adopt.commentsCount = null;
      adopt.comments = [];
      return assign({}, state, { adopt });
    }

    // TODO: use another action for loading more
    case adoptAction.ActionTypes.COMMENT_LIST_CLEAR: {
      const error: any = action.payload;
      const adopt = clone(state.adopt);
      adopt.commentsCount = null;
      adopt.comments = [];
      return assign({}, state, { adopt });
    }

    /**
     * Comment Create Event
     */
    case adoptAction.ActionTypes.COMMENT_CREATE_EVENT: {
      const res: IAdoptCommentCreateEventResponse = action.payload;
      if (res.adopt === state.adopt.id) {
        const adopt = clone(state.adopt);
        adopt.commentsCount++;
        adopt.comments.push(res);
        return assign({}, state, { adopt });
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
export const getAdopt = (state: State) => state.adopt;

