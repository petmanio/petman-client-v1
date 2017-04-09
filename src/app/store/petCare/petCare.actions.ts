import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { IPetCareListRequest, IPetCareListResponse, IPetCarePinsRequest, IPetCarePinsResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LIST: type('[PetCare] List'),
  LIST_COMPLETE: type('[PetCare] List Complete'),
  LIST_ERROR: type('[PetCare] List Error'),

  LIST_CLEAR: type('[PetCare] List Clear'),

  PINS: type('[PetCare] Pins'),
  PINS_COMPLETE: type('[PetCare] Pins Complete'),
  PINS_ERROR: type('[PetCare] Pins Error')
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

  constructor(public payload: IPetCareListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IPetCareListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

export class ListClearAction implements Action {
  type = ActionTypes.LIST_CLEAR;

  constructor(public payload: any) { }
}

export class PinsAction implements Action {
  type = ActionTypes.PINS;

  constructor(public payload: IPetCarePinsRequest) { }
}

export class PinsCompleteAction implements Action {
  type = ActionTypes.PINS_COMPLETE;

  constructor(public payload: IPetCarePinsResponse[]) { }
}

export class PinsErrorAction implements Action {
  type = ActionTypes.PINS_ERROR;

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
  | PinsAction
  | PinsCompleteAction
  | PinsErrorAction
