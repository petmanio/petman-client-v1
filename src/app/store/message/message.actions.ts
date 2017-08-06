import { Action } from '@ngrx/store';
import { type } from '../../../util';
import {
  IMessageConversationRequest,
  IMessageConversationResponse,
  IMessageConversationsRequest,
  IMessageConversationsResponse,
  IMessageCreateRequest,
  IMessageCreateResponse
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
  CREATE: type('[Message] Create'),
  CREATE_SUCCESS: type('[Message] Create Success'),
  CREATE_ERROR: type('[Message] Create Error'),

  CONVERSATION: type('[Message] Conversation'),
  CONVERSATION_SUCCESS: type('[Message] Conversation Success'),
  CONVERSATION_ERROR: type('[Message] Conversation Error'),

  CONVERSATIONS: type('[Message] Conversations'),
  CONVERSATIONS_SUCCESS: type('[Message] Conversations Success'),
  CONVERSATIONS_ERROR: type('[Message] Conversations Error'),

  SELECT_UNIQUE_ID: type('[Message] Select Unique Id'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Create
 */
export class CreateAction implements Action {
  type = ActionTypes.CREATE;

  constructor(public payload: IMessageCreateRequest) { }
}

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload: IMessageCreateResponse) { }
}

export class CreateErrorAction implements Action {
  type = ActionTypes.CREATE_ERROR;

  constructor(public payload: any) { }
}

/**
 * Conversation
 */
export class ConversationAction implements Action {
  type = ActionTypes.CONVERSATION;

  constructor(public payload: IMessageConversationRequest) { }
}

export class ConversationSuccessAction implements Action {
  type = ActionTypes.CONVERSATION_SUCCESS;

  constructor(public payload: IMessageConversationResponse) { }
}

export class ConversationErrorAction implements Action {
  type = ActionTypes.CONVERSATION_ERROR;

  constructor(public payload: any) { }
}

/**
 * Conversations
 */
export class ConversationsAction implements Action {
  type = ActionTypes.CONVERSATIONS;

  constructor(public payload: IMessageConversationsRequest) { }
}

export class ConversationsSuccessAction implements Action {
  type = ActionTypes.CONVERSATIONS_SUCCESS;

  constructor(public payload: IMessageConversationsResponse) { }
}

export class ConversationsErrorAction implements Action {
  type = ActionTypes.CONVERSATIONS_ERROR;

  constructor(public payload: any) { }
}

/**
 * Select Unique Id
 */
export class SelectUniqueIdAction implements Action {
  readonly type = ActionTypes.SELECT_UNIQUE_ID;

  constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CreateAction
  | CreateSuccessAction
  | CreateErrorAction
  | ConversationAction
  | ConversationSuccessAction
  | ConversationErrorAction
  | ConversationsAction
  | ConversationsSuccessAction
  | ConversationsErrorAction
  | SelectUniqueIdAction
