import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  INotification, INotificationListRequest, INotificationListResponse, INotificationSeenRequest,
  INotificationSeenResponse
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
  LIST: type('[Notification] List'),
  LIST_SUCCESS: type('[Notification] List Success'),
  LIST_ERROR: type('[Notification] List Error'),
  LIST_CLEAR: type('[Notification] List Clear'),

  SEEN: type('[Notification] Seen'),
  SEEN_SUCCESS: type('[Notification] Seen Success'),
  SEEN_ERROR: type('[Notification] Seen Error'),

  NOTIFICATION_NEW_EVENT: type('[Notification] New Event'),
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

  constructor(public payload: INotificationListRequest) { }
}

export class ListSuccessAction implements Action {
  type = ActionTypes.LIST_SUCCESS;

  constructor(public payload: INotificationListResponse) { }
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
 * Seen
 */
export class SeenAction implements Action {
  type = ActionTypes.SEEN;

  constructor(public payload: INotificationSeenRequest) { }
}

export class SeenSuccessAction implements Action {
  type = ActionTypes.SEEN_SUCCESS;

  constructor(public payload: INotificationSeenResponse) { }
}

export class SeenErrorAction implements Action {
  type = ActionTypes.SEEN_ERROR;

  constructor(public payload: any) { }
}


/**
 * Notification New Event
 */
export class NewEventAction implements Action {
  type = ActionTypes.NOTIFICATION_NEW_EVENT;

  constructor(public payload: INotification) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ListAction
  | ListSuccessAction
  | ListErrorAction
  | ListClearAction
  | SeenAction
  | SeenSuccessAction
  | SeenErrorAction
  | NewEventAction
