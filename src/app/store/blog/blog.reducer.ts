import { createSelector } from 'reselect';
import { IBlogListRequest, IBlogListResponse } from '../../models/api';
import * as blogAction from './blog.actions';

export interface State {
  list?: {
    data?: IBlogListResponse,
    error?: any
  }
}

const initialState: State = {
  list: {
    data: {
      list: [],
      count: null
    },
    error: null
  }
};

export function reducer(state = initialState, action: blogAction.Actions): State {
  switch (action.type) {
    case blogAction.ActionTypes.LIST_COMPLETE: {
      const res: IBlogListResponse = action.payload;
      //use object assign
      return {
        list: {
          data: {
            list: state.list.data.list.concat(res.list),
            count: res.count
          }
        },
      };
    }

    case blogAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return {
        list: { data: { count: null, list: [] }, error: error.status || 'UNKNOWN_ERROR' },
      };
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
export const getListData = list => list.data;
export const getListError = list => list.error;
