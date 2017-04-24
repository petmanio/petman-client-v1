import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { IContractCountRequest, IContractCountResponse, IContractListRequest, IContractListResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  GET_COUNT: type('[Contract] Get Count'),
  GET_COUNT_COMPLETE: type('[Contract] Get Count Complete'),
  GET_COUNT_ERROR: type('[Contract] Get Count Error'),

  LIST: type('[Contract] List'),
  LIST_COMPLETE: type('[Contract] List Complete'),
  LIST_ERROR: type('[Contract] List Error'),
  LIST_CLEAR: type('[Contract] List Clear')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Get Count
 */
export class GetCountAction implements Action {
  type = ActionTypes.GET_COUNT;

  constructor(public payload: IContractCountRequest) { }
}

export class GetCountCompleteAction implements Action {
  type = ActionTypes.GET_COUNT_COMPLETE;

  constructor(public payload: IContractCountResponse) { }
}

export class GetCountErrorAction implements Action {
  type = ActionTypes.GET_COUNT_ERROR;

  constructor(public payload: any) { }
}

/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IContractListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IContractListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

export class ListClearAction implements Action {
  type = ActionTypes.LIST_CLEAR;

  constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetCountAction
  | GetCountCompleteAction
  | GetCountErrorAction
  | ListAction
  | ListCompleteAction
  | ListErrorAction
  | ListClearAction
