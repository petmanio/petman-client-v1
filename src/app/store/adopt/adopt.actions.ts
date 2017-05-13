import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IAdoptCommentCreateEventResponse,
  IAdoptCommentCreateRequest,
  IAdoptCommentListRequest,
  IAdoptCommentListResponse,
  IAdoptCreateRequest,
  IAdoptCreateResponse,
  IAdoptGetByIdRequest,
  IAdoptGetByIdResponse,
  IAdoptListRequest,
  IAdoptListResponse
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
  GET_BY_ID: type('[Adopt] Get By Id'),
  GET_BY_ID_COMPLETE: type('[Adopt] Get By Id Complete'),
  GET_BY_ID_ERROR: type('[Adopt] Get By Id Error'),

  LIST: type('[Adopt] List'),
  LIST_COMPLETE: type('[Adopt] List Complete'),
  LIST_ERROR: type('[Adopt] List Error'),
  LIST_CLEAR: type('[Adopt] List Clear'),

  CREATE: type('[Adopt] Create'),
  CREATE_COMPLETE: type('[Adopt] Create Complete'),
  CREATE_ERROR: type('[Adopt] Create Error'),

  COMMENT_LIST: type('[Room] Comment List'),
  COMMENT_LIST_COMPLETE: type('[Room] Comment Complete'),
  COMMENT_LIST_ERROR: type('[Room] Comment Error'),
  COMMENT_LIST_CLEAR: type('[Room] Comment Clear'),

  COMMENT_CREATE: type('[Room] Comment Create'),
  // TODO: add actions for complete and error

  COMMENT_CREATE_EVENT: type('[Room] Comment Create Event'),
  // TODO: add actions for complete and error
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

  constructor(public payload: IAdoptGetByIdRequest) { }
}

export class GetByIdCompleteAction implements Action {
  type = ActionTypes.GET_BY_ID_COMPLETE;

  constructor(public payload: IAdoptGetByIdResponse) { }
}

export class GetByIdErrorAction implements Action {
  type = ActionTypes.GET_BY_ID_ERROR;

  constructor(public payload: any) { }
}

/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IAdoptListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IAdoptListResponse) { }
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
 * Create
 */
export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IAdoptCreateRequest) { }
}

export class CreateCompleteAction implements Action {
  type = ActionTypes.CREATE_COMPLETE;

  constructor(public payload: IAdoptCreateResponse) { }
}

export class CreateErrorAction implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Comment List
 */
export class CommentListAction implements Action {
  type = ActionTypes.COMMENT_LIST;

  constructor(public payload: IAdoptCommentListRequest) { }
}

export class CommentListCompleteAction implements Action {
  type = ActionTypes.COMMENT_LIST_COMPLETE;

  constructor(public payload: IAdoptCommentListResponse) { }
}

export class CommentListErrorAction implements Action {
  type = ActionTypes.COMMENT_LIST_ERROR;

  constructor(public payload: any) { }
}

export class CommentListClearAction implements Action {
  type = ActionTypes.COMMENT_LIST_CLEAR;

  constructor(public payload: any) { }
}

/**
 * Comment Create
 */
// TODO: add complete and error actions
export class CommentCreateAction implements Action {
  type = ActionTypes.COMMENT_CREATE;

  constructor(public payload: IAdoptCommentCreateRequest) { }
}

/**
 * Comment Create Event
 */
export class CommentCreateEventAction implements Action {
  type = ActionTypes.COMMENT_CREATE_EVENT;

  constructor(public payload: IAdoptCommentCreateEventResponse) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetByIdAction
  | GetByIdCompleteAction
  | GetByIdErrorAction
  | ListAction
  | ListCompleteAction
  | ListErrorAction
  | ListClearAction
  | CreateAction
  | CreateCompleteAction
  | CreateErrorAction
  | CommentListAction
  | CommentListCompleteAction
  | CommentListErrorAction
  | CommentListClearAction
  | CommentCreateAction
  | CommentCreateEventAction
