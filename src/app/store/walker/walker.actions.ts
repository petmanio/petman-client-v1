import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IWalkerListRequest, IWalkerListResponse, IWalkerCreateRequest, IWalkerCreateResponse, IWalkerGetByIdRequest,
  IWalkerGetByIdResponse, IWalkerApplyRequest, IWalkerApplyResponse, IWalkerUpdateApplicationRequest, IWalkerUpdateApplicationResponse,
  IWalkerApplicationMessageListRequest, IWalkerApplicationMessageListResponse, IWalkerApplicationMessageJoinRequest,
  IWalkerApplicationMessageCreateRequest, IWalkerApplicationMessageCreateEventResponse, IWalkerShareOnFacebookRequest,
  IWalkerShareOnFacebookResponse
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
  GET_BY_ID: type('[Walker] Get By Id'),
  GET_BY_ID_COMPLETE: type('[Walker] Get By Id Complete'),
  GET_BY_ID_ERROR: type('[Walker] Get By Id Error'),

  LIST: type('[Walker] List'),
  LIST_COMPLETE: type('[Walker] List Complete'),
  LIST_ERROR: type('[Walker] List Error'),
  LIST_CLEAR: type('[Walker] List Clear'),

  CREATE: type('[Walker] Create'),
  CREATE_COMPLETE: type('[Walker] Create Complete'),
  CREATE_ERROR: type('[Walker] Create Error'),

  APPLY: type('[Walker] Apply'),
  APPLY_COMPLETE: type('[Walker] Apply Complete'),
  APPLY_ERROR: type('[Walker] Apply Error'),

  UPDATE_APPLICATION: type('[Walker] Update Application'),
  UPDATE_APPLICATION_COMPLETE: type('[Walker] Update Application Complete'),
  UPDATE_APPLICATION_ERROR: type('[Walker] Update Application Error'),

  APPLICATION_MESSAGE_LIST: type('[Walker] Application Message List'),
  APPLICATION_MESSAGE_LIST_COMPLETE: type('[Walker] Application Message Complete'),
  APPLICATION_MESSAGE_LIST_ERROR: type('[Walker] Application Message Error'),
  APPLICATION_MESSAGE_LIST_CLEAR: type('[Walker] Application Message Clear'),

  APPLICATION_MESSAGE_CREATE: type('[Walker] Application Message Create'),
  // TODO: add actions for complete and error

  APPLICATION_MESSAGE_CREATE_EVENT: type('[Walker] Application Message Create Event'),
  // TODO: add actions for complete and error

  SHARE_ON_FACEBOOK: type('[Walker] Share On Facebook'),
  SHARE_ON_FACEBOOK_COMPLETE: type('[Walker] Share On Facebook Complete'),
  SHARE_ON_FACEBOOK_ERROR: type('[Walker] Share On Facebook Error'),
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

  constructor(public payload: IWalkerGetByIdRequest) { }
}

export class GetByIdCompleteAction implements Action {
  type = ActionTypes.GET_BY_ID_COMPLETE;

  constructor(public payload: IWalkerGetByIdResponse) { }
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

  constructor(public payload: IWalkerListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IWalkerListResponse) { }
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

  constructor(public payload: IWalkerCreateRequest) { }
}

export class CreateCompleteAction implements Action {
  type = ActionTypes.CREATE_COMPLETE;

  constructor(public payload: IWalkerCreateResponse) { }
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

  constructor(public payload: IWalkerApplyRequest) { }
}

export class ApplyCompleteAction implements Action {
  type = ActionTypes.APPLY_COMPLETE;

  constructor(public payload: IWalkerApplyResponse) { }
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

  constructor(public payload: IWalkerUpdateApplicationRequest) { }
}

export class UpdateApplicationCompleteAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_COMPLETE;

  constructor(public payload: IWalkerUpdateApplicationResponse) { }
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

  constructor(public payload: IWalkerApplicationMessageListRequest) { }
}

export class ApplicationMessageListCompleteAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_LIST_COMPLETE;

  constructor(public payload: IWalkerApplicationMessageListResponse) { }
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
 * Application Message Create
 */
// TODO: add complete and error actions
export class ApplicationMessageCreateAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_CREATE;

  constructor(public payload: IWalkerApplicationMessageCreateRequest) { }
}

/**
 * Application Message Create Event
 */
export class ApplicationMessageCreateEventAction implements Action {
  type = ActionTypes.APPLICATION_MESSAGE_CREATE_EVENT;

  constructor(public payload: IWalkerApplicationMessageCreateEventResponse) { }
}

/**
 * Share On Facebook
 */
export class ShareOnFacebookAction implements Action {
  type = ActionTypes.SHARE_ON_FACEBOOK;

  constructor(public payload: IWalkerShareOnFacebookRequest) { }
}

export class ShareOnFacebookCompleteAction implements Action {
  type = ActionTypes.SHARE_ON_FACEBOOK_COMPLETE;

  constructor(public payload: IWalkerShareOnFacebookResponse) { }
}

export class ShareOnFacebookErrorAction implements Action {
  type = ActionTypes.SHARE_ON_FACEBOOK_ERROR;

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
  | ApplicationMessageCreateAction
  | ApplicationMessageCreateEventAction
  | ShareOnFacebookAction
  | ShareOnFacebookCompleteAction
  | ShareOnFacebookErrorAction
