import { assign } from 'lodash';
import { ILocationFiltersResponse, ILocationListResponse, ILocationPinsResponse } from '../../models/api';
import * as locationAction from './location.actions';

export interface State {
  list?: ILocationListResponse
  pins?: ILocationPinsResponse[],
  filters?: ILocationFiltersResponse
}

const initialState: State = {
  list: {
    list: [],
    total: null
  },
  pins: [],
  filters: {}
};

export function reducer(state = initialState, action: locationAction.Actions): State {
  switch (action.type) {
    /**
     * Filters
     */
    case locationAction.ActionTypes.FILTERS_SUCCESS: {
      const res: ILocationFiltersResponse = action.payload;
      return assign({}, state, { filters: res });
    }

    case locationAction.ActionTypes.FILTERS_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { filters: {} });
    }

    /**
     * List
     */
    case locationAction.ActionTypes.LIST_SUCCESS: {
      const res: ILocationListResponse = action.payload;
      return assign({}, state, { list: { total: res.total, list: res.list } });
    }

    case locationAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { total: null, list: [] } });
    }

    case locationAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { total: null, list: [] } });
    }

    /**
     * List Load More
     */
    case locationAction.ActionTypes.LIST_LOAD_MORE_SUCCESS: {
      const res: ILocationListResponse = action.payload;
      return assign({}, state, { list: { total: state.list.total, list: state.list.list.concat(res.list) } });
    }

    case locationAction.ActionTypes.LIST_LOAD_MORE_ERROR: {
      const error: any = action.payload;
      return state;
    }

    /**
     * Pins
     */
    case locationAction.ActionTypes.PINS_SUCCESS: {
      const res: ILocationPinsResponse[] = action.payload;
      return assign({}, state, { pins: res });
    }

    case locationAction.ActionTypes.PINS_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { pins: [] });
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

export const getFilters = (state: State) => state.filters;
export const getList = (state: State) => state.list;
export const getPins = (state: State) => state.pins;

