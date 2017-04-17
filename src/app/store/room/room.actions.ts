import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { IRoomListRequest, IRoomListResponse, IRoomCreateRequest,  IRoomCreateResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LIST: type('[Room] List'),
  LIST_COMPLETE: type('[Room] List Complete'),
  LIST_ERROR: type('[Room] List Error'),
  LIST_CLEAR: type('[Room] List Clear'),

  CREATE: type('[Room] Create'),
  CREATE_COMPLETE: type('[Room] Create Complete'),
  CREATE_ERROR: type('[Room] Create Error')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IRoomListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IRoomListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

export class ListClearAction implements Action {
  type = ActionTypes.LIST_CLEAR;

  constructor(public payload: any) { }
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IRoomCreateRequest) { }
}

export class CreateCompleteAction implements Action {
  type = ActionTypes.CREATE_COMPLETE;

  constructor(public payload: IRoomCreateResponse) { }
}

export class CreateErrorAction implements Action {
  type = ActionTypes.CREATE_ERROR;

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
  | ListClearAction
  | CreateAction
  | CreateCompleteAction
  | CreateErrorAction
