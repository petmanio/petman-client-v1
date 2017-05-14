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
    count: null
  }
};

export function reducer(state = initialState, action: blogAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case blogAction.ActionTypes.LIST_COMPLETE: {
      const res: IBlogListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case blogAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case blogAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
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
