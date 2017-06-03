import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  ILocationFiltersRequest, ILocationFiltersResponse, ILocationListRequest, ILocationListResponse, ILocationPinsRequest,
  ILocationPinsResponse
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
  LIST: type('[Location] List'),
  LIST_COMPLETE: type('[Location] List Complete'),
  LIST_ERROR: type('[Location] List Error'),
  LIST_CLEAR: type('[Location] List Clear'),

  LIST_LOAD_MORE: type('[Location] List Load More'),
  LIST_LOAD_MORE_COMPLETE: type('[Location] List Load More Complete'),
  LIST_LOAD_MORE_ERROR: type('[Location] List Load More Error'),

  FILTERS: type('[Location] Filters'),
  FILTERS_COMPLETE: type('[Location] Filters Complete'),
  FILTERS_ERROR: type('[Location] Filters Error'),

  PINS: type('[Location] Pins'),
  PINS_COMPLETE: type('[Location] Pins Complete'),
  PINS_ERROR: type('[Location] Pins Error')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * List
 */
export class ListAction implements Action {
  type = ActionTypes.LIST;

  constructor(public payload: ILocationListRequest) { }
}

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

  constructor(public payload: ILocationListResponse) { }
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
 * List Load More
 */
export class ListLoadMoreAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE;

  constructor(public payload: ILocationListRequest) { }
}

export class ListLoadMoreCompleteAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE_COMPLETE;

  constructor(public payload: ILocationListResponse) { }
}

export class ListLoadMoreErrorAction implements Action {
  type = ActionTypes.LIST_LOAD_MORE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Pins
 */
export class PinsAction implements Action {
  type = ActionTypes.PINS;

  constructor(public payload: ILocationPinsRequest) { }
}

export class PinsCompleteAction implements Action {
  type = ActionTypes.PINS_COMPLETE;

  constructor(public payload: ILocationPinsResponse[]) { }
}

export class PinsErrorAction implements Action {
  type = ActionTypes.PINS_ERROR;

  constructor(public payload: any) { }
}

export class FiltersAction implements Action {
  type = ActionTypes.FILTERS;

  constructor(public payload: ILocationFiltersRequest) { }
}

export class FiltersCompleteAction implements Action {
  type = ActionTypes.FILTERS_COMPLETE;

  constructor(public payload: ILocationFiltersResponse) { }
}

export class FiltersErrorAction implements Action {
  type = ActionTypes.FILTERS_ERROR;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = FiltersAction
  | FiltersCompleteAction
  | FiltersErrorAction
  | ListAction
  | ListCompleteAction
  | ListErrorAction
  | ListClearAction
  | ListLoadMoreAction
  | ListLoadMoreCompleteAction
  | ListLoadMoreErrorAction
  | PinsAction
  | PinsCompleteAction
  | PinsErrorAction
