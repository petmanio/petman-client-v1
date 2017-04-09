import { createSelector } from 'reselect';
import { IPetCareListRequest, IPetCareListResponse, IPetCarePinsResponse } from '../../models/api';
import * as petCareAction from './petCare.actions';

export interface State {
  list?: IPetCareListResponse
  pins?: IPetCarePinsResponse[]
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  pins: []
};

export function reducer(state = initialState, action: petCareAction.Actions): State {
  switch (action.type) {
    // TODO: use another action for loading more
    case petCareAction.ActionTypes.LIST_COMPLETE: {
      const res: IPetCareListResponse = action.payload;
      // TODO: use object assign
      return {
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
        list: state.list,
        pins: res
      };
    }

    case petCareAction.ActionTypes.PINS_ERROR: {
      const error: any = action.payload;
      return {
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

export const getList = (state: State) => state.list;
export const getPins = (state: State) => state.pins;

