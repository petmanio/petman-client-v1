import { createSelector } from 'reselect';
import { IWalker, IWalkerApplication } from '../../models/api';
import * as walker from './walker.actions';
import { assign, cloneDeep, find, omit } from 'lodash';

export interface State {
  ids: string[],
  entities: { [id: string]: IWalker },
  totalEntities: number,
  selectedWalkerId: string,
  applicationEntities: { [id: string]: { total: number, list: IWalkerApplication[]} },
}

export const initialState: State = {
  ids: [],
  entities: {},
  totalEntities: null,
  selectedWalkerId: null,
  applicationEntities: {},
};

export function reducer(state = initialState, action: walker.Actions): State {
  switch (action.type) {
    /**
     * List
     */
    case walker.ActionTypes.LIST_SUCCESS: {
      const walkers = action.payload.list;
      const total = action.payload.total;
      const newWalkers = walkers.filter(walker => !state.entities[walker.id]);

      const newWalkerIds = newWalkers.map(walker => walker.id);
      const newWalkerEntities = newWalkers.reduce((entities: { [id: string]: IWalker }, walker: IWalker) => {
        return assign(entities, {
          [walker.id]: walker
        });
      }, {});

      const update = {
        ids: [ ...state.ids, ...newWalkerIds ],
        entities: Object.assign({}, state.entities, newWalkerEntities),
        totalEntities: total
      };

      return assign({}, state, update);
    }

    /**
     * Applications list
     */
    case walker.ActionTypes.APPLICATION_LIST_SUCCESS: {
      return assign({}, state, { applicationEntities: { [action.payload.walkerId]: omit(action.payload, 'walkerId') } })
    }

    /**
     * Load
     */
    case walker.ActionTypes.LOAD_SUCCESS: {
      const walker = action.payload;

      if (state.ids.indexOf(walker.id) > -1) {
        return state;
      }

      const update = {
        ids: [ ...state.ids, walker.id ],
        entities: assign({}, state.entities, {
          [walker.id]: walker
        })
      };

      return assign({}, state, update);
    }

    /**
     * Create
     */
    case walker.ActionTypes.CREATE_SUCCESS: {
      const walker = action.payload;

      if (state.ids.indexOf(walker.id) > -1) {
        return state;
      }

      const update = {
        ids: [ ...state.ids, walker.id ],
        entities: assign({}, state.entities, {
          [walker.id]: walker
        })
      };

      return assign({}, state, update);
    }

    /**
     * Apply
     */
    case walker.ActionTypes.APPLY_SUCCESS: {
      const application = action.payload;
      const applications = cloneDeep(state.applicationEntities[application.walker]);
      if (applications) {
        applications.list.unshift(application);
        applications.total++;
        return assign({}, state, {
          applicationEntities: assign({}, state.applicationEntities, {
            [application.walker]: applications
          })
        });
      }
      return state;
    }

    /**
     * Update Application status
     */
    case walker.ActionTypes.UPDATE_APPLICATION_STATUS_SUCCESS: {
      const walkerId = action.payload.walkerId;
      const applicationId = action.payload.applicationId;
      const status = action.payload.status;
      const applications = cloneDeep(state.applicationEntities[walkerId]);
      if (applications) {
        const match = find(applications.list, item => item.id === applicationId);
        if (match) {
          match.status = status;
          return assign({}, state, {
            applicationEntities: assign({}, state.applicationEntities, {
              [walkerId]: applications
            })
          });
        }
      }
      return state;
    }

    /**
     * Rate Application
     */
    case walker.ActionTypes.RATE_APPLICATION_SUCCESS: {
      const walkerId = action.payload.walkerId;
      const applicationId = action.payload.applicationId;
      const rating = action.payload.rating;
      const review = action.payload.review;
      const applications = cloneDeep(state.applicationEntities[walkerId]);
      if (applications) {
        const match = find(applications.list, item => item.id === applicationId);
        if (match) {
          match.rating = rating;
          match.review = review;
          return assign({}, state, {
            applicationEntities: assign({}, state.applicationEntities, {
              [walkerId]: applications
            })
          });
        }
      }
      return state;
    }

    /**
     * Delete
     */
    case walker.ActionTypes.DELETE_SUCCESS: {
      return assign({}, state, {
        entities: omit(state.entities, action.payload.walkerId),
        totalEntities: state.totalEntities ? state.totalEntities - 1 : state.totalEntities
      });
    }

    /**
     * Select
     */
    case walker.ActionTypes.SELECT: {
      return assign({}, state, {
        selectedWalkerId: action.payload
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

export const getSelectedId = (state: State) => state.selectedWalkerId;

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
