import { createSelector } from 'reselect';
import { ILocationFiltersResponse, ILocationListRequest, ILocationListResponse, ILocationPinsResponse } from '../../models/api';
import * as locationAction from './location.actions';

export interface State {
  list?: ILocationListResponse
  pins?: ILocationPinsResponse[],
  filters?: ILocationFiltersResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  pins: [],
  filters: {}
};

export function reducer(state = initialState, action: locationAction.Actions): State {
  switch (action.type) {
    case locationAction.ActionTypes.FILTERS_COMPLETE: {
      const res: ILocationFiltersResponse = action.payload;
      // TODO: use object assign
      return {
        list: state.list,
        pins: state.pins,
        filters: res
      };
    }

    case locationAction.ActionTypes.FILTERS_ERROR: {
      const error: any = action.payload;
      return {
        list: state.list,
        pins: state.pins,
        filters: {}
      };
    }

    // TODO: use another action for loading more
    case locationAction.ActionTypes.LIST_COMPLETE: {
      const res: ILocationListResponse = action.payload;
      // TODO: use object assign
      return {
        filters: state.filters,
        list: {
          list: state.list.list.concat(res.list),
          count: res.count
        },
        pins: state.pins
      };
    }

    case locationAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return {
        filters: state.filters,
        list: {
          list: [],
          count: null
        },
        pins: state.pins
      };
    }

    // TODO: use another action for loading more
    case locationAction.ActionTypes.LIST_CLEAR: {
      // TODO: use object assign
      return {
        filters: state.filters,
        list: {
          list: [],
          count: null
        },
        pins: state.pins
      };
    }

    case locationAction.ActionTypes.PINS_COMPLETE: {
      const res: ILocationPinsResponse[] = action.payload;
      // TODO: use object assign
      return {
        filters: state.filters,
        list: state.list,
        pins: res
      };
    }

    case locationAction.ActionTypes.PINS_ERROR: {
      const error: any = action.payload;
      return {
        filters: state.filters,
        list: state.list,
        pins: []
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

export const getFilters = (state: State) => state.filters;
export const getList = (state: State) => state.list;
export const getPins = (state: State) => state.pins;

