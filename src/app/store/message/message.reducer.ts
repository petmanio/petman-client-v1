import { createSelector } from 'reselect';
import { IMessage } from '../../models/api';
import * as message from './message.actions';
import { assign, cloneDeep, find, omit } from 'lodash';
import { UtilService } from '../../services/util/util.service';

export interface State {
  entities: { [userEntity: string]: IMessage[] },
  conversationsEntities: { [userEntity: string]: IMessage },
  totalConversations: number,
  selectedUserEntityId: string
}

export const initialState: State = {
  entities: {},
  conversationsEntities: {},
  totalConversations: null,
  selectedUserEntityId: null,
};

export function reducer(state = initialState, action: message.Actions): State {
  switch (action.type) {
    /**
     * Create
     */
    // case message.ActionTypes.CREATE_SUCCESS: {
    //   const message = action.payload;
    //   const userMessages = state.entities[message];
    //   const update = {
    //     entities: en
    //   };
    //
    // }

    case message.ActionTypes.CONVERSATIONS_SUCCESS: {
      const conversations = action.payload;
      const conversationsEntities = conversations.list.reduce((map, obj) => {
        map[UtilService.uniqueNumberFromNumbers(obj.from.id, obj.to.id)] = obj;
        return map;
      }, {});

      return assign({}, state, { conversationsEntities, totalConversations: conversations.total });
    }

    // /**
    //  * Select
    //  */
    // case message.ActionTypes.SELECT: {
    //   return assign({}, state, {
    //     selectedUserEntityId: action.payload
    //   });
    // }

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

export const getSelectedUserEntityId = (state: State) => state.selectedUserEntityId;

export const getSelected = createSelector(getEntities, getSelectedUserEntityId, (entities, selectedId) => {
  return entities[selectedId];
});
