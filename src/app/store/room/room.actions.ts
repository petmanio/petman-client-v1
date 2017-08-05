import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IRoomApplicationListRequest,
  IRoomApplicationListResponse,
  IRoomApplyRequest,
  IRoomApplyResponse,
  IRoomCreateRequest,
  IRoomCreateResponse,
  IRoomDeleteRequest,
  IRoomDeleteResponse,
  IRoomGetByIdRequest,
  IRoomGetByIdResponse,
  IRoomListRequest,
  IRoomListResponse,
  IRoomRateApplicationRequest,
  IRoomRateApplicationResponse,
  IRoomUpdateApplicationStatusRequest,
  IRoomUpdateApplicationStatusResponse
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
  LIST: type('[Room] List'),
  LIST_SUCCESS: type('[Room] List Success'),
  LIST_ERROR: type('[Room] List Error'),

  APPLICATION_LIST: type('[Room] Application List'),
  APPLICATION_LIST_SUCCESS: type('[Room] Application List Success'),
  APPLICATION_LIST_ERROR: type('[Room] Application List Error'),

  LOAD: type('[Room] Load'),
  LOAD_SUCCESS: type('[Room] Load Success'),
  LOAD_ERROR: type('[Room] Load Error'),

  DELETE: type('[Room] Delete'),
  DELETE_SUCCESS: type('[Room] Delete Success'),
  DELETE_ERROR: type('[Room] Delete By Error'),

  SELECT: type('[Room] Select'),

  CREATE: type('[Room] Create'),
  CREATE_SUCCESS: type('[Room] Create Success'),
  CREATE_ERROR: type('[Room] Create Error'),

  APPLY: type('[Room] Apply'),
  APPLY_SUCCESS: type('[Room] Apply Success'),
  APPLY_ERROR: type('[Room] Apply Error'),

  UPDATE_APPLICATION_STATUS: type('[Room] Update Application Status'),
  UPDATE_APPLICATION_STATUS_SUCCESS: type('[Room] Update Application Status Success'),
  UPDATE_APPLICATION_STATUS_ERROR: type('[Room] Update Application Status Error'),

  RATE_APPLICATION: type('[Room] Rate Application'),
  RATE_APPLICATION_SUCCESS: type('[Room] Rate Application Success'),
  RATE_APPLICATION_ERROR: type('[Room] Rate Application Error')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Load
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: IRoomGetByIdRequest) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: IRoomGetByIdResponse) { }
}

export class LoadErrorAction implements Action {
  type = ActionTypes.LOAD_ERROR;

  constructor(public payload: any) { }
}

/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: IRoomListRequest) { }
}

export class ListSuccessAction implements Action {
  type = ActionTypes.LIST_SUCCESS;

  constructor(public payload: IRoomListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

/**
 * Review list
 */
export class ApplicationListAction implements Action {
  type = ActionTypes.APPLICATION_LIST;

  constructor(public payload: IRoomApplicationListRequest) { }
}

export class ApplicationListSuccessAction implements Action {
  type = ActionTypes.APPLICATION_LIST_SUCCESS;

  constructor(public payload: IRoomApplicationListResponse) { }
}

export class ApplicationListErrorAction implements Action {
  type = ActionTypes.APPLICATION_LIST_ERROR;

  constructor(public payload: any) { }
}

/**
 * Create
 */
export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IRoomCreateRequest) { }
}

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: IRoomCreateResponse) { }
}

export class CreateErrorAction implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Select
 */
export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT;

  constructor(public payload: string) { }
}

/**
 * Delete
 */
export class DeleteAction implements Action {
  type = ActionTypes.DELETE;

  constructor(public payload: IRoomDeleteRequest) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: IRoomDeleteResponse) { }
}

export class DeleteErrorAction implements Action {
  type = ActionTypes.DELETE_ERROR;

  constructor(public payload: any) { }
}


/**
 * Apply
 */
export class ApplyAction implements Action {
  type = ActionTypes.APPLY;

  constructor(public payload: IRoomApplyRequest) { }
}

export class ApplySuccessAction implements Action {
  type = ActionTypes.APPLY_SUCCESS;

  constructor(public payload: IRoomApplyResponse) { }
}

export class ApplyErrorAction implements Action {
  type = ActionTypes.APPLY_ERROR;

  constructor(public payload: any) { }
}

/**
 * Update Application Status
 */
export class UpdateApplicationStatusAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_STATUS;

  constructor(public payload: IRoomUpdateApplicationStatusRequest) { }
}

export class UpdateApplicationStatusSuccessAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_STATUS_SUCCESS;

  constructor(public payload: IRoomUpdateApplicationStatusResponse) { }
}

export class UpdateApplicationStatusErrorAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_STATUS_ERROR;

  constructor(public payload: any) { }
}

/**
 * Rate Application
 */
export class RateApplicationAction implements Action {
  type = ActionTypes.RATE_APPLICATION;

  constructor(public payload: IRoomRateApplicationRequest) { }
}

export class RateApplicationSuccessAction implements Action {
  type = ActionTypes.RATE_APPLICATION_SUCCESS;

  constructor(public payload: IRoomRateApplicationResponse) { }
}

export class RateApplicationErrorAction implements Action {
  type = ActionTypes.RATE_APPLICATION_ERROR;

  constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadErrorAction
  | CreateAction
  | CreateSuccessAction
  | CreateErrorAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteErrorAction
  | ApplyAction
  | ApplySuccessAction
  | ApplyErrorAction
  | UpdateApplicationStatusAction
  | UpdateApplicationStatusSuccessAction
  | UpdateApplicationStatusErrorAction
  | RateApplicationAction
  | RateApplicationSuccessAction
  | RateApplicationErrorAction
  | SelectAction

