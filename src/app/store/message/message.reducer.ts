import { createSelector } from 'reselect';
import { IMessage, IUser } from '../../models/api';
import * as message from './message.actions';
import { assign } from 'lodash';

export interface State {
  entities: { [uniqueId: string]: { total: number, list: IMessage[], userEntity: IUser } },
  conversationsEntities: { [uniqueId: string]: IMessage },
  totalConversations: number,
  selectedUniqueId: string
}

export const initialState: State = {
  entities: {},
  conversationsEntities: {},
  totalConversations: null,
  selectedUniqueId: null,
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {
    /**
     * Create
     */
    case message.ActionTypes.CREATE_SUCCESS: {
      const message = action.payload;
      const uid = [message.from.id, message.to.id].sort().join('_');
      const conversation = state.entities[uid];
      if (conversation) {
        const update = {
          total: conversation.total + 1,
          userEntity: conversation.userEntity,
          list: [message].concat(conversation.list)
        };
        return assign({}, state, { entities: {[uid]: update}, conversationsEntities: {[uid]: message}});
      }
      return assign({}, state, { conversationsEntities: assign({}, state.conversationsEntities, {[uid]: message})});
    }

    /**
     * Conversations
     */
    case message.ActionTypes.CONVERSATIONS_SUCCESS: {
      const conversations = action.payload;
      const conversationsEntities = conversations.list.reduce((map, obj) => {
        map[[obj.from.id, obj.to.id].sort().join('_')] = obj;
        return map;
      }, {});

      return assign({}, state, { conversationsEntities, totalConversations: conversations.total });
    }

    /**
     * Conversation
     */
    case message.ActionTypes.CONVERSATION_SUCCESS: {
      const conversation = action.payload;
      const uid = [localStorage.getItem('userId'), conversation.userEntity.id].sort().join('_');
      return assign({}, state, { entities: {[uid]: conversation} });
    }

    /**
     * Select
     */
    case message.ActionTypes.SELECT_UNIQUE_ID: {
      return assign({}, state, {
        selectedUniqueId: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getConversationsEntities = (state: State) => state.conversationsEntities;

export const getTotalConversations = (state: State) => state.totalConversations;

export const getConversations = createSelector(getConversationsEntities, (entities) => {
  return Object.keys(entities).map((key) => entities[key]);
});

export const getSelectedUniqueId = (state: State) => state.selectedUniqueId;

export const getSelectedConversation = createSelector(getEntities, getSelectedUniqueId, (entities, selectedId) => {
  return entities[selectedId];
});
