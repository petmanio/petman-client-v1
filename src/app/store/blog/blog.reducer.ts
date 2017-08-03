import { createSelector } from 'reselect';
import { IBlogListResponse } from '../../models/api';
import * as blogAction from './blog.actions';
import { assign } from 'lodash';


export interface State {
  list: IBlogListResponse,
}

const initialState: State = {
  list: {
    list: [],
    total: null
  }
};

export function reducer(state = initialState, action: blogAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    case blogAction.ActionTypes.LIST_SUCCESS: {
      const res: IBlogListResponse = action.payload;
      return assign({}, state, { list: { list: res.list, total: res.total }});
    }

    case blogAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], total: null }});
    }

    case blogAction.ActionTypes.LIST_CLEAR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], total: null }});
    }

    /**
     * List Load More
     */
    case blogAction.ActionTypes.LIST_LOAD_MORE_SUCCESS: {
      const res: IBlogListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), total: res.total }});
    }

    case blogAction.ActionTypes.LIST_LOAD_MORE_ERROR: {
      const error: any = action.payload;
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
