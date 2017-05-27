import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { IBlogListRequest, IBlogListResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LIST: type('[Blog] List'),
  LIST_COMPLETE: type('[Blog] List Complete'),
  LIST_ERROR: type('[Blog] List Error'),

  LIST_LOAD_MORE: type('[Blog] List Load More'),
  LIST_LOAD_MORE_COMPLETE: type('[Blog] List Load more Complete'),
  LIST_LOAD_MORE_ERROR: type('[Blog] List Load More Error')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IBlogListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IBlogListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

/**
 * List Load More
 */
export class ListLoadMoreAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE;

  constructor(public payload: IBlogListRequest) { }
}

export class ListLoadMoreCompleteAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE_COMPLETE;

  constructor(public payload: IBlogListResponse) { }
}

export class ListLoadMoreErrorAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ListAction
  | ListCompleteAction
  | ListErrorAction
  | ListLoadMoreAction
  | ListLoadMoreCompleteAction
  | ListLoadMoreErrorAction
