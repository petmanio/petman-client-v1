import { createSelector } from 'reselect';
import { IShopListRequest, IShopListResponse } from '../../models/api';
import * as shopAction from './shop.actions';

export interface State {
  list?: {
    data?: IShopListResponse,
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

export function reducer(state = initialState, action: shopAction.Actions): State {
  switch (action.type) {
    case shopAction.ActionTypes.LIST_COMPLETE: {
      const res: IShopListResponse = action.payload;
      //TODO: use object assign
      return {
        list: {
          data: {
            list: state.list.data.list.concat(res.list),
            count: res.count
          }
        },
      };
    }

    case shopAction.ActionTypes.LIST_ERROR: {
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
