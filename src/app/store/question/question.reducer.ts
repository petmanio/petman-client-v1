import { assign } from 'lodash';
import { IQuestionGetByIdResponse, IQuestionListResponse } from '../../models/api';
import * as questionAction from './question.actions';

export interface State {
  question: IQuestionGetByIdResponse,
  list: IQuestionListResponse
}

const initialState: State = {
  list: {
    list: [],
    total: null
  },
  question: null,
};

export function reducer(state = initialState, action: questionAction.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    case questionAction.ActionTypes.LIST_SUCCESS: {
      const res: IQuestionListResponse = action.payload;
      return assign({}, state, { list: { list: state.list.list.concat(res.list), total: res.total }});
    }

    case questionAction.ActionTypes.LIST_ERROR: {
      const error: any = action.payload;
      return assign({}, state, { list: { list: [], total: null }});
    }

    /**
     * Get By Id
     */
    case questionAction.ActionTypes.GET_BY_ID_SUCCESS: {
      const res: IQuestionGetByIdResponse = action.payload;
      return assign({}, state, {question: res});
    }

    case questionAction.ActionTypes.GET_BY_ID_ERROR: {
      const error: any = action.payload;
      return assign({}, state, {question: null})
    }

    /**
     * Clear
     */
    case questionAction.ActionTypes.CLEAR: {
      return assign({}, initialState);
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
export const getQuestion = (state: State) => state.question;

