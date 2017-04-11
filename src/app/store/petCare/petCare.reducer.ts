import { createSelector } from 'reselect';
import { IPetCareFiltersResponse, IPetCareListRequest, IPetCareListResponse, IPetCarePinsResponse } from '../../models/api';
import * as petCareAction from './petCare.actions';

export interface State {
  list?: IPetCareListResponse
  pins?: IPetCarePinsResponse[],
  filters?: IPetCareFiltersResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  pins: [],
  filters: {}
};

export function reducer(state = initialState, action: petCareAction.Actions): State {
  switch (action.type) {
    case petCareAction.ActionTypes.FILTERS_COMPLETE: {
      const res: IPetCareFiltersResponse = action.payload;
      // TODO: use object assign
      return {
        list: state.list,
        pins: state.pins,
        filters: res
      };
    }

    case petCareAction.ActionTypes.FILTERS_ERROR: {
      const error: any = action.payload;
      return {
        list: state.list,
        pins: state.pins,
        filters: {}
      };
    }

    // TODO: use another action for loading more
    case petCareAction.ActionTypes.LIST_COMPLETE: {
      const res: IPetCareListResponse = action.payload;
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

    case petCareAction.ActionTypes.LIST_ERROR: {
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
    case petCareAction.ActionTypes.LIST_CLEAR: {
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

    case petCareAction.ActionTypes.PINS_COMPLETE: {
      const res: IPetCarePinsResponse[] = action.payload;
      // TODO: use object assign
      return {
        filters: state.filters,
        list: state.list,
        pins: res
      };
    }

    case petCareAction.ActionTypes.PINS_ERROR: {
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

