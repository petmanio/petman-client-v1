import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IWalkerApplicationListRequest,
  IWalkerApplicationListResponse,
  IWalkerApplyRequest,
  IWalkerApplyResponse,
  IWalkerCreateRequest,
  IWalkerCreateResponse,
  IWalkerDeleteRequest,
  IWalkerDeleteResponse,
  IWalkerGetByIdRequest,
  IWalkerGetByIdResponse,
  IWalkerListRequest,
  IWalkerListResponse,
  IWalkerRateApplicationRequest,
  IWalkerRateApplicationResponse,
  IWalkerUpdateApplicationStatusRequest,
  IWalkerUpdateApplicationStatusResponse
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
  LIST: type('[Walker] List'),
  LIST_SUCCESS: type('[Walker] List Success'),
  LIST_ERROR: type('[Walker] List Error'),

  APPLICATION_LIST: type('[Walker] Application List'),
  APPLICATION_LIST_SUCCESS: type('[Walker] Application List Success'),
  APPLICATION_LIST_ERROR: type('[Walker] Application List Error'),

  LOAD: type('[Walker] Load'),
  LOAD_SUCCESS: type('[Walker] Load Success'),
  LOAD_ERROR: type('[Walker] Load Error'),

  DELETE: type('[Walker] Delete'),
  DELETE_SUCCESS: type('[Walker] Delete Success'),
  DELETE_ERROR: type('[Walker] Delete By Error'),

  SELECT: type('[Walker] Select'),

  CREATE: type('[Walker] Create'),
  CREATE_SUCCESS: type('[Walker] Create Success'),
  CREATE_ERROR: type('[Walker] Create Error'),

  APPLY: type('[Walker] Apply'),
  APPLY_SUCCESS: type('[Walker] Apply Success'),
  APPLY_ERROR: type('[Walker] Apply Error'),

  UPDATE_APPLICATION_STATUS: type('[Walker] Update Application Status'),
  UPDATE_APPLICATION_STATUS_SUCCESS: type('[Walker] Update Application Status Success'),
  UPDATE_APPLICATION_STATUS_ERROR: type('[Walker] Update Application Status Error'),

  RATE_APPLICATION: type('[Walker] Rate Application'),
  RATE_APPLICATION_SUCCESS: type('[Walker] Rate Application Success'),
  RATE_APPLICATION_ERROR: type('[Walker] Rate Application Error')
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

  constructor(public payload: IWalkerGetByIdRequest) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: IWalkerGetByIdResponse) { }
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

  constructor(public payload: IWalkerListRequest) { }
}

export class ListSuccessAction implements Action {
  type = ActionTypes.LIST_SUCCESS;

  constructor(public payload: IWalkerListResponse) { }
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

  constructor(public payload: IWalkerApplicationListRequest) { }
}

export class ApplicationListSuccessAction implements Action {
  type = ActionTypes.APPLICATION_LIST_SUCCESS;

  constructor(public payload: IWalkerApplicationListResponse) { }
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

  constructor(public payload: IWalkerCreateRequest) { }
}

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: IWalkerCreateResponse) { }
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

  constructor(public payload: IWalkerDeleteRequest) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: IWalkerDeleteResponse) { }
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

  constructor(public payload: IWalkerApplyRequest) { }
}

export class ApplySuccessAction implements Action {
  type = ActionTypes.APPLY_SUCCESS;

  constructor(public payload: IWalkerApplyResponse) { }
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

  constructor(public payload: IWalkerUpdateApplicationStatusRequest) { }
}

export class UpdateApplicationStatusSuccessAction implements Action {
  type = ActionTypes.UPDATE_APPLICATION_STATUS_SUCCESS;

  constructor(public payload: IWalkerUpdateApplicationStatusResponse) { }
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

  constructor(public payload: IWalkerRateApplicationRequest) { }
}

export class RateApplicationSuccessAction implements Action {
  type = ActionTypes.RATE_APPLICATION_SUCCESS;

  constructor(public payload: IWalkerRateApplicationResponse) { }
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

