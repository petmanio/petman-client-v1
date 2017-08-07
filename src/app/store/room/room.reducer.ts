import { createSelector } from 'reselect';
import { IRoom, IRoomApplication } from '../../models/api';
import * as room from './room.actions';
import { assign, cloneDeep, find, omit } from 'lodash';

export interface State {
  ids: string[],
  entities: { [id: string]: IRoom },
  totalEntities: number,
  selectedRoomId: string,
  applicationEntities: { [id: string]: { total: number, list: IRoomApplication[]} },
}

export const initialState: State = {
  ids: [],
  entities: {},
  totalEntities: null,
  selectedRoomId: null,
  applicationEntities: {},
};

export function reducer(state = initialState, action: room.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    case room.ActionTypes.LIST_SUCCESS: {
      const rooms = action.payload.list;
      const total = action.payload.total;
      const newRooms = rooms.filter(room => !state.entities[room.id]);

      const newRoomIds = newRooms.map(room => room.id);
      const newRoomEntities = newRooms.reduce((entities: { [id: string]: IRoom }, room: IRoom) => {
        return assign(entities, {
          [room.id]: room
        });
      }, {});

      const update = {
        ids: [ ...state.ids, ...newRoomIds ],
        entities: Object.assign({}, state.entities, newRoomEntities),
        totalEntities: total
      };

      return assign({}, state, update);
    }

    /**
     * Applications list
     */
    case room.ActionTypes.APPLICATION_LIST_SUCCESS: {
      return assign({}, state, { applicationEntities: { [action.payload.roomId]: omit(action.payload, 'roomId') } })
    }

    /**
     * Load
     */
    case room.ActionTypes.LOAD_SUCCESS: {
      const room = action.payload;

      if (state.ids.indexOf(room.id) > -1) {
        return state;
      }

      const update = {
        ids: [ ...state.ids, room.id ],
        entities: assign({}, state.entities, {
          [room.id]: room
        })
      };

      return assign({}, state, update);
    }

    /**
     * Create
     */
    case room.ActionTypes.CREATE_SUCCESS: {
      const room = action.payload;

      if (state.ids.indexOf(room.id) > -1) {
        return state;
      }

      const update = {
        ids: [ ...state.ids, room.id ],
        entities: assign({}, state.entities, {
          [room.id]: room
        })
      };

      return assign({}, state, update);
    }

    /**
     * Apply
     */
    case room.ActionTypes.APPLY_SUCCESS: {
      const application = action.payload;
      const applications = cloneDeep(state.applicationEntities[application.room]);
      if (applications) {
        applications.list.unshift(application);
        applications.total++;
        return assign({}, state, {
          applicationEntities: assign({}, state.applicationEntities, {
            [application.room]: applications
          })
        });
      }
      return state;
    }

    /**
     * Update Application status
     */
    case room.ActionTypes.UPDATE_APPLICATION_STATUS_SUCCESS: {
      const roomId = action.payload.roomId;
      const applicationId = action.payload.applicationId;
      const status = action.payload.status;
      const applications = cloneDeep(state.applicationEntities[roomId]);
      if (applications) {
        const match = find(applications.list, item => item.id === applicationId);
        if (match) {
          match.status = status;
          return assign({}, state, {
            applicationEntities: assign({}, state.applicationEntities, {
              [roomId]: applications
            })
          });
        }
      }
      return state;
    }

    /**
     * Rate Application
     */
    case room.ActionTypes.RATE_APPLICATION_SUCCESS: {
      const roomId = action.payload.roomId;
      const applicationId = action.payload.applicationId;
      const rating = action.payload.rating;
      const review = action.payload.review;
      const applications = cloneDeep(state.applicationEntities[roomId]);
      if (applications) {
        const match = find(applications.list, item => item.id === applicationId);
        if (match) {
          match.rating = rating;
          match.review = review;
          return assign({}, state, {
            applicationEntities: assign({}, state.applicationEntities, {
              [roomId]: applications
            })
          });
        }
      }
      return state;
    }

    /**
     * Delete
     */
    case room.ActionTypes.DELETE_SUCCESS: {
      return assign({}, state, {
        entities: omit(state.entities, action.payload.roomId),
        totalEntities: state.totalEntities ? state.totalEntities - 1 : state.totalEntities
      });
    }

    /**
     * Select
     */
    case room.ActionTypes.SELECT: {
      return assign({}, state, {
        selectedRoomId: action.payload
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

export const getTotalEntities = (state: State) => state.totalEntities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedRoomId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const getApplicationEntities = (state: State) => state.applicationEntities;

export const getSelectedApplications = createSelector(getApplicationEntities, getSelectedId, (applicationEntities, selectedId) => {
  return applicationEntities[selectedId] || { total: null, list: [] };
});

export const getSelectedReviews = createSelector(getSelectedApplications, (applicationList) => {
  const list = applicationList.list.filter(application => application.rating);
  return { total: list.length, list };
});
