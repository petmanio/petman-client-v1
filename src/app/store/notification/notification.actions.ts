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
  LIST_COMPLETE: type('[Notification] List Complete'),
  LIST_ERROR: type('[Notification] List Error'),
  LIST_CLEAR: type('[Notification] List Clear'),

  SEEN: type('[Notification] Seen'),
  SEEN_COMPLETE: type('[Notification] Seen Complete'),
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

export class ListCompleteAction implements Action {
  type = ActionTypes.LIST_COMPLETE;

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

export class SeenCompleteAction implements Action {
  type = ActionTypes.SEEN_COMPLETE;

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
  | ListCompleteAction
  | ListErrorAction
  | ListClearAction
  | SeenAction
  | SeenCompleteAction
  | SeenErrorAction
  | NewEventAction
