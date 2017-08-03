import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IAdoptCommentCreateEventResponse,
  IAdoptCommentCreateRequest,
  IAdoptCommentListRequest,
  IAdoptCommentListResponse,
  IAdoptCreateRequest,
  IAdoptCreateResponse,
  IAdoptDeleteRequest,
  IAdoptDeleteResponse,
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
  GET_BY_ID_SUCCESS: type('[Adopt] Get By Id Success'),
  GET_BY_ID_ERROR: type('[Adopt] Get By Id Error'),
  GET_BY_ID_CLEAR: type('[Adopt] Get By Id Clear'),

  DELETE: type('[Adopt] Delete By Id'),
  DELETE_SUCCESS: type('[Adopt] Delete By Id Success'),
  DELETE_ERROR: type('[Adopt] Delete By IdError'),

  LIST: type('[Adopt] List'),
  LIST_SUCCESS: type('[Adopt] List Success'),
  LIST_ERROR: type('[Adopt] List Error'),
  LIST_CLEAR: type('[Adopt] List Clear'),

  CREATE: type('[Adopt] Create'),
  CREATE_SUCCESS: type('[Adopt] Create Success'),
  CREATE_ERROR: type('[Adopt] Create Error'),

  COMMENT_LIST: type('[Adopt] Comment List'),
  COMMENT_LIST_SUCCESS: type('[Adopt] Comment Success'),
  COMMENT_LIST_ERROR: type('[Adopt] Comment Error'),

  COMMENT_LIST_LOAD_MORE: type('[Adopt] Comment Load More'),
  COMMENT_LIST_LOAD_MORE_SUCCESS: type('[Adopt] Comment Load More Success'),
  COMMENT_LIST_LOAD_MORE_ERROR: type('[Adopt] Comment Load More Error'),

  COMMENT_CREATE: type('[Adopt] Comment Create'),
  // TODO: add actions for complete and error

  COMMENT_CREATE_EVENT: type('[Adopt] Comment Create Event'),
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

export class GetByIdSuccessAction implements Action {
  type = ActionTypes.GET_BY_ID_SUCCESS;

  constructor(public payload: IAdoptGetByIdResponse) { }
}

export class GetByIdErrorAction implements Action {
  type = ActionTypes.GET_BY_ID_ERROR;

  constructor(public payload: any) { }
}

export class GetByIdClearAction implements Action {
  type = ActionTypes.GET_BY_ID_CLEAR;

  constructor(public payload: any) { }
}

/**
 * Delete By Id
 */
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: IAdoptDeleteRequest) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: IAdoptDeleteResponse) { }
}

export class DeleteErrorAction implements Action {
  type = ActionTypes.DELETE_ERROR;

  constructor(public payload: any) { }
}


/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IAdoptListRequest) { }
}

export class ListSuccessAction implements Action {
  type = ActionTypes.LIST_SUCCESS;

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

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

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

export class CommentListSuccessAction implements Action {
  type = ActionTypes.COMMENT_LIST_SUCCESS;

  constructor(public payload: IAdoptCommentListResponse) { }
}

export class CommentListErrorAction implements Action {
  type = ActionTypes.COMMENT_LIST_ERROR;

  constructor(public payload: any) { }
}

/**
 * Comment load more
 */
export class CommentListLoadMoreAction implements Action {
  type = ActionTypes.COMMENT_LIST_LOAD_MORE;

  constructor(public payload: IAdoptCommentListRequest) { }
}

export class CommentListLoadMoreSuccessAction implements Action {
  type = ActionTypes.COMMENT_LIST_LOAD_MORE_SUCCESS;

  constructor(public payload: IAdoptCommentListResponse) { }
}

export class CommentListLoadMoreErrorAction implements Action {
  type = ActionTypes.COMMENT_LIST_LOAD_MORE_ERROR;

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
  | GetByIdSuccessAction
  | GetByIdErrorAction
  | GetByIdClearAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteErrorAction
  | ListAction
  | ListSuccessAction
  | ListErrorAction
  | ListClearAction
  | CreateAction
  | CreateSuccessAction
  | CreateErrorAction
  | CommentListAction
  | CommentListSuccessAction
  | CommentListErrorAction
  | CommentListLoadMoreAction
  | CommentListLoadMoreSuccessAction
  | CommentListLoadMoreErrorAction
  | CommentCreateAction
  | CommentCreateEventAction
