import { Action } from '@ngrx/store';
import { type } from '../../../util';
import { IShopListRequest, IShopListResponse, IShopPinsRequest, IShopPinsResponse } from '../../models/api';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LIST: type('[Shop] List'),
  LIST_COMPLETE: type('[Shop] List Complete'),
  LIST_ERROR: type('[Shop] List Error'),

  PINS: type('[Shop] Pins'),
  PINS_COMPLETE: type('[Shop] Pins Complete'),
  PINS_ERROR: type('[Shop] Pins Error')
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

  constructor(public payload: IShopListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: IShopListResponse) { }
}

export class ListErrorAction implements Action {
  type = ActionTypes.LIST_ERROR;

  constructor(public payload: any) { }
}

export class PinsAction implements Action {
  type = ActionTypes.PINS;

  constructor(public payload: IShopPinsRequest) { }
}

export class PinsCompleteAction implements Action {
  type = ActionTypes.PINS_COMPLETE;

  constructor(public payload: IShopPinsResponse[]) { }
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
  | PinsAction
  | PinsCompleteAction
  | PinsErrorAction
