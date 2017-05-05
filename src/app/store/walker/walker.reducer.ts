import { assign, clone, findIndex, pick, cloneDeep } from 'lodash';
import {
  IWalkerApplication,
  IWalkerApplicationMessageCreateEventResponse,
  IWalkerApplicationMessageListResponse,
  IWalkerGetByIdResponse,
  IWalkerListResponse,
  IWalkerUpdateApplicationRequest
} from '../../models/api';
import * as walkerAction from './walker.actions';
import { stat } from 'fs';

export interface State {
  walker: IWalkerGetByIdResponse,
  list: IWalkerListResponse,
  applicationMessageList: IWalkerApplicationMessageListResponse
}

const initialState: State = {
  list: {
    list: [],
    count: null
  },
  walker: null,
  applicationMessageList: {
    list: [],
    count: null
  }
};

export function reducer(state = initialState, action: walkerAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    // TODO: use another action for loading more
    case walkerAction.ActionTypes.LIST_COMPLETE: {
      const res: IWalkerListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), count: res.count }});
    }

    case walkerAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case walkerAction.ActionTypes.LIST_CLEAR: {
      return assign({}, state, { list: { list: [], count: null }});
    }

    /**
     * Get By Id
     */
    case walkerAction.ActionTypes.GET_BY_ID_COMPLETE: {
      const res: IWalkerGetByIdResponse = action.payload;
      // TODO: use object assign
      return Object.assign({}, state, {walker: res});
    }

    case walkerAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {walker: null})
    }

    /**
     * Application Apply
     * TODO: get walker application separately, store into applications
     */
    case walkerAction.ActionTypes.APPLY_COMPLETE: {
      const res: IWalkerApplication = action.payload;
      if (res.walker !== state.walker.id) {
        return state
      } else {
        const walker = cloneDeep(state.walker);
        walker.applications.unshift(res);
        return Object.assign({}, state, { walker });
      }
    }

    /**
     * Update Application
     */
    case walkerAction.ActionTypes.UPDATE_APPLICATION_COMPLETE: {
      const res: IWalkerUpdateApplicationRequest = action.payload;
      const applicationIndex = findIndex(state.walker.applications, (application) => application.id === res.id);
      // TODO: without clone
      const applications = clone(state.walker.applications);
      if (applicationIndex !== -1) {
        // TODO: merge full object
        applications[applicationIndex] = assign({}, state.walker.applications[applicationIndex], pick(res,
          ['status', 'review', 'rating', 'finishedAt']));
      }
      const walker = Object.assign({}, state.walker, { applications });
      return Object.assign({}, state, { walker: walker })
    }

    case walkerAction.ActionTypes.UPDATE_APPLICATION_ERROR: {
      const error: any = action.payload;
      return Object.assign({}, state, {})
    }

    /**
     * Application Message List
     */
    // TODO: use another action for loading more
    case walkerAction.ActionTypes.APPLICATION_MESSAGE_LIST_COMPLETE: {
      const res: IWalkerApplicationMessageListResponse = action.payload;
      return assign({}, state, { applicationMessageList: { list: state.applicationMessageList.list.concat(res.list), count: res.count }});
    }

    case walkerAction.ActionTypes.APPLICATION_MESSAGE_LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { applicationMessageList: { list: [], count: null }});
    }

    // TODO: use another action for loading more
    case walkerAction.ActionTypes.APPLICATION_MESSAGE_LIST_CLEAR: {
      return assign({}, state, { applicationMessageList: { list: [], count: null }});
    }

    /**
     * Application Message List
     */
    case walkerAction.ActionTypes.APPLICATION_MESSAGE_CREATE_EVENT: {
      const res: IWalkerApplicationMessageCreateEventResponse = action.payload;
      return assign({}, state, { applicationMessageList: { list: state.applicationMessageList.list.concat([res]), count: null }});
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
export const getWalker = (state: State) => state.walker;
export const getApplicationMessageList = (state: State) => state.applicationMessageList;

