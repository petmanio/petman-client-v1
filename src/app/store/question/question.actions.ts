import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IQuestionCreateRequest,
  IQuestionCreateResponse,
  IQuestionDeleteByIdRequest,
  IQuestionDeleteByIdResponse,
  IQuestionGetByIdRequest,
  IQuestionGetByIdResponse,
  IQuestionListRequest,
  IQuestionListResponse
} from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  GET_BY_ID: type('[Question] Get By Id'),
  GET_BY_ID_COMPLETE: type('[Question] Get By Id Complete'),
  GET_BY_ID_ERROR: type('[Question] Get By Id Error'),

  DELETE_BY_ID: type('[Question] Delete By Id'),
  DELETE_BY_ID_COMPLETE: type('[Question] Delete By Id Complete'),
  DELETE_BY_ID_ERROR: type('[Question] Delete By IdError'),

  LIST: type('[Question] List'),
  LIST_COMPLETE: type('[Question] List Complete'),
  LIST_ERROR: type('[Question] List Error'),

  CREATE: type('[Question] Create'),
  CREATE_COMPLETE: type('[Question] Create Complete'),
  CREATE_ERROR: type('[Question] Create Error'),

  CLEAR: type('[Question] Clear')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Get By Id
 */
export class GetByIdAction implements Action {
  type = ActionTypes.GET_BY_ID;

  constructor(public payload: IQuestionGetByIdRequest) { }
}

export class GetByIdCompleteAction implements Action {
  type = ActionTypes.GET_BY_ID_COMPLETE;

  constructor(public payload: IQuestionGetByIdResponse) { }
}

export class GetByIdErrorAction implements Action {
  type = ActionTypes.GET_BY_ID_ERROR;

  constructor(public payload: any) { }
}

/**
 * Delete By Id
 */
export class DeleteByIdAction implements Action {
  type = ActionTypes.DELETE_BY_ID;

  constructor(public payload: IQuestionDeleteByIdRequest) { }
}

export class DeleteByIdCompleteAction implements Action {
  type = ActionTypes.DELETE_BY_ID_COMPLETE;

  constructor(public payload: IQuestionDeleteByIdResponse) { }
}

export class DeleteByIdErrorAction implements Action {
  type = ActionTypes.DELETE_BY_ID_ERROR;

  constructor(public payload: any) { }
}


/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IQuestionListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IQuestionListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

/**
 * Create
 */
export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IQuestionCreateRequest) { }
}

export class CreateCompleteAction implements Action {
  type = ActionTypes.CREATE_COMPLETE;

  constructor(public payload: IQuestionCreateResponse) { }
}

export class CreateErrorAction implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Clear
 */
export class ClearAction implements Action {
  type = ActionTypes.CLEAR;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetByIdAction
  | GetByIdCompleteAction
  | GetByIdErrorAction
  | DeleteByIdAction
  | DeleteByIdCompleteAction
  | DeleteByIdErrorAction
  | ListAction
  | ListCompleteAction
  | ListErrorAction
  | CreateAction
  | CreateCompleteAction
  | CreateErrorAction
  | ClearAction

