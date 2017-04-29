import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IRoomListRequest, IRoomListResponse, IRoomCreateRequest, IRoomCreateResponse, IRoomGetByIdRequest,
  IRoomGetByIdResponse, IRoomApplyRequest, IRoomApplyResponse, IRoomUpdateApplicationRequest, IRoomUpdateApplicationResponse,
  IRoomApplicationMessageListRequest, IRoomApplicationMessageListResponse, IRoomApplicationMessageJoinRequest,
  IRoomApplicationMessageCreateRequest, IRoomApplicationMessageCreateEventResponse
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
  GET_BY_ID: type('[Room] Get By Id'),
  GET_BY_ID_COMPLETE: type('[Room] Get By Id Complete'),
  GET_BY_ID_ERROR: type('[Room] Get By Id Error'),

  LIST: type('[Room] List'),
  LIST_COMPLETE: type('[Room] List Complete'),
  LIST_ERROR: type('[Room] List Error'),
  LIST_CLEAR: type('[Room] List Clear'),

  CREATE: type('[Room] Create'),
  CREATE_COMPLETE: type('[Room] Create Complete'),
  CREATE_ERROR: type('[Room] Create Error'),

  APPLY: type('[Room] Apply'),
  APPLY_COMPLETE: type('[Room] Apply Complete'),
  APPLY_ERROR: type('[Room] Apply Error'),

  UPDATE_APPLICATION: type('[Room] Update Application'),
  UPDATE_APPLICATION_COMPLETE: type('[Room] Update Application Complete'),
  UPDATE_APPLICATION_ERROR: type('[Room] Update Application Error'),

  APPLICATION_MESSAGE_LIST: type('[Room] Application Message List'),
  APPLICATION_MESSAGE_LIST_COMPLETE: type('[Room] Application Message Complete'),
  APPLICATION_MESSAGE_LIST_ERROR: type('[Room] Application Message Error'),
  APPLICATION_MESSAGE_LIST_CLEAR: type('[Room] Application Message Clear'),

  APPLICATION_MESSAGE_JOIN: type('[Room] Application Message Join'),
  // TODO: add actions for complete and error

  APPLICATION_MESSAGE_CREATE: type('[Room] Application Message Create'),
  // TODO: add actions for complete and error

  APPLICATION_MESSAGE_CREATE_EVENT: type('[Room] Application Message Create Event'),
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

  constructor(public payload: IRoomGetByIdRequest) { }
}

export class GetByIdCompleteAction implements Action {
  type = ActionTypes.GET_BY_ID_COMPLETE;

  constructor(public payload: IRoomGetByIdResponse) { }
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

/**
 * Create
 */
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
 * Apply
 */
export class ApplyAction implements Action {
  type = ActionTypes.APPLY;

  constructor(public payload: IRoomApplyRequest) { }
}

export class ApplyCompleteAction implements Action {
  type = ActionTypes.APPLY_COMPLETE;

  constructor(public payload: IRoomApplyResponse) { }
}

export class ApplyErrorAction implements Action {
  type = ActionTypes.APPLY_ERROR;

  constructor(public payload: any) { }
}

/**
 * Update Application
 */
export class UpdateApplicationAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION;

  constructor(public payload: IRoomUpdateApplicationRequest) { }
}

export class UpdateApplicationCompleteAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_COMPLETE;

  constructor(public payload: IRoomUpdateApplicationResponse) { }
}

export class UpdateApplicationErrorAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_ERROR;

  constructor(public payload: any) { }
}

/**
 * Application Message List
 */
export class ApplicationMessageListAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_LIST;

  constructor(public payload: IRoomApplicationMessageListRequest) { }
}

export class ApplicationMessageListCompleteAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_LIST_COMPLETE;

  constructor(public payload: IRoomApplicationMessageListResponse) { }
}

export class ApplicationMessageListErrorAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_LIST_ERROR;

  constructor(public payload: any) { }
}

export class ApplicationMessageListClearAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_LIST_CLEAR;

  constructor(public payload: any) { }
}

/**
 * Application Message Join
 */
export class ApplicationMessageJoinAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_JOIN;

  constructor(public payload: IRoomApplicationMessageJoinRequest) { }
}

/**
 * Application Message Create
 */
export class ApplicationMessageCreateAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_CREATE;

  constructor(public payload: IRoomApplicationMessageCreateRequest) { }
}

/**
 * Application Message Create Event
 */
export class ApplicationMessageCreateEventAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_CREATE_EVENT;

  constructor(public payload: IRoomApplicationMessageCreateEventResponse) { }
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
  | ApplyAction
  | ApplyCompleteAction
  | ApplyErrorAction
  | UpdateApplicationAction
  | UpdateApplicationCompleteAction
  | UpdateApplicationErrorAction
  | ApplicationMessageListAction
  | ApplicationMessageListCompleteAction
  | ApplicationMessageListErrorAction
  | ApplicationMessageListClearAction
  | ApplicationMessageJoinAction
  | ApplicationMessageCreateAction
  | ApplicationMessageCreateEventAction
