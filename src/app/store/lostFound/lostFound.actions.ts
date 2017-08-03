import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  ILostFoundCommentCreateEventResponse,
  ILostFoundCommentCreateRequest,
  ILostFoundCommentListRequest,
  ILostFoundCommentListResponse,
  ILostFoundCreateRequest,
  ILostFoundCreateResponse,
  ILostFoundDeleteRequest,
  ILostFoundDeleteResponse,
  ILostFoundGetByIdRequest,
  ILostFoundGetByIdResponse,
  ILostFoundListRequest,
  ILostFoundListResponse
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
  GET_BY_ID: type('[LostFound] Get By Id'),
  GET_BY_ID_SUCCESS: type('[LostFound] Get By Id Success'),
  GET_BY_ID_ERROR: type('[LostFound] Get By Id Error'),
  GET_BY_ID_CLEAR: type('[LostFound] Get By Id Clear'),

  DELETE: type('[LostFound] Delete By Id'),
  DELETE_SUCCESS: type('[LostFound] Delete By Id Success'),
  DELETE_ERROR: type('[LostFound] Delete By IdError'),

  LIST: type('[LostFound] List'),
  LIST_SUCCESS: type('[LostFound] List Success'),
  LIST_ERROR: type('[LostFound] List Error'),
  LIST_CLEAR: type('[LostFound] List Clear'),

  CREATE: type('[LostFound] Create'),
  CREATE_SUCCESS: type('[LostFound] Create Success'),
  CREATE_ERROR: type('[LostFound] Create Error'),

  COMMENT_LIST: type('[LostFound] Comment List'),
  COMMENT_LIST_SUCCESS: type('[LostFound] Comment Success'),
  COMMENT_LIST_ERROR: type('[LostFound] Comment Error'),

  COMMENT_LIST_LOAD_MORE: type('[LostFound] Comment Load More'),
  COMMENT_LIST_LOAD_MORE_SUCCESS: type('[LostFound] Comment Load More Success'),
  COMMENT_LIST_LOAD_MORE_ERROR: type('[LostFound] Comment Load More Error'),

  COMMENT_CREATE: type('[LostFound] Comment Create'),
  // TODO: add actions for complete and error

  COMMENT_CREATE_EVENT: type('[LostFound] Comment Create Event'),
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

  constructor(public payload: ILostFoundGetByIdRequest) { }
}

export class GetByIdSuccessAction implements Action {
  type = ActionTypes.GET_BY_ID_SUCCESS;

  constructor(public payload: ILostFoundGetByIdResponse) { }
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

  constructor(public payload: ILostFoundDeleteRequest) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: ILostFoundDeleteResponse) { }
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

  constructor(public payload: ILostFoundListRequest) { }
}

export class ListSuccessAction implements Action {
  type = ActionTypes.LIST_SUCCESS;

  constructor(public payload: ILostFoundListResponse) { }
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

  constructor(public payload: ILostFoundCreateRequest) { }
}

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: ILostFoundCreateResponse) { }
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

  constructor(public payload: ILostFoundCommentListRequest) { }
}

export class CommentListSuccessAction implements Action {
  type = ActionTypes.COMMENT_LIST_SUCCESS;

  constructor(public payload: ILostFoundCommentListResponse) { }
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

  constructor(public payload: ILostFoundCommentListRequest) { }
}

export class CommentListLoadMoreSuccessAction implements Action {
  type = ActionTypes.COMMENT_LIST_LOAD_MORE_SUCCESS;

  constructor(public payload: ILostFoundCommentListResponse) { }
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

  constructor(public payload: ILostFoundCommentCreateRequest) { }
}

/**
 * Comment Create Event
 */
export class CommentCreateEventAction implements Action {
  type = ActionTypes.COMMENT_CREATE_EVENT;

  constructor(public payload: ILostFoundCommentCreateEventResponse) { }
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
