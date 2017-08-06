export { AuthEffects } from './auth/auth.effects';
export { BlogEffects } from './blog/blog.effects';
export { RoomEffects } from './room/room.effects';
export { WalkerEffects } from './walker/walker.effects';
export { AdoptEffects } from './adopt/adopt.effects';
export { LostFoundEffects } from './lostFound/lostFound.effects';
export { QuestionEffects } from './question/question.effects';
export { NotificationEffects } from './notification/notification.effects';
export { LocationEffects } from './location/location.effects';
export { MessageEffects } from './message/message.effects';

import { createSelector } from 'reselect';
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitrooms.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from './layout/layout.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromBlog from './blog/blog.reducer';
import * as fromLocation from './location/location.reducer';
import * as fromRooms from './room/room.reducer';
import * as fromWalkers from './walker/walker.reducer';
import * as fromAdopt from './adopt/adopt.reducer';
import * as fromLostFound from './lostFound/lostFound.reducer';
import * as fromQuestion from './question/question.reducer';
import * as fromNotification from './notification/notification.reducer';
import * as fromMessages from './message/message.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth: fromAuth.State,
  blog: fromBlog.State,
  location: fromLocation.State,
  rooms: fromRooms.State,
  walkers: fromWalkers.State,
  adopt: fromAdopt.State,
  lostFound: fromLostFound.State,
  question: fromQuestion.State,
  notification: fromNotification.State,
  messages: fromMessages.State,
  layout: fromLayout.State,
  router: fromRouter.RouterState,
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  auth: fromAuth.reducer,
  blog: fromBlog.reducer,
  location: fromLocation.reducer,
  rooms: fromRooms.reducer,
  walkers: fromWalkers.reducer,
  adopt: fromAdopt.reducer,
  lostFound: fromLostFound.reducer,
  question: fromQuestion.reducer,
  notification: fromNotification.reducer,
  messages: fromMessages.reducer,
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
};


const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getAuthState = (state: State) => state.auth;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the auth state then we pass the state to the room
 * reducer's getAuth selector, finally returning an observable
 * of search results.
 *
 * Share memoizes the selector functions and publishes the result. This means
 * every time you call the selector, you will get back the same result
 * observable. Each subscription to the resultant observable
 * is shared across all subscribers.
 */

/**
 * Auth Reducers
 */
export const getAuthCurrentUser = createSelector(getAuthState, fromAuth.getCurrentUser);
// TODO: remove error from state

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);

/**
 * Blog Reducers
 */
export const getBlogState = (state: State) => state.blog;
export const getBlogList = createSelector(getBlogState, fromBlog.getList);

/**
 * Location Reducers
 */
export const getLocationState = (state: State) => state.location;
export const getLocationList = createSelector(getLocationState, fromLocation.getList);
export const getLocationFilters = createSelector(getLocationState, fromLocation.getFilters);
export const getLocationPins = createSelector(getLocationState, fromLocation.getPins);

/**
 * Adopt Reducers
 */
export const getAdoptState = (state: State) => state.adopt;
export const getAdoptList = createSelector(getAdoptState, fromAdopt.getList);
// TODO: update method and store item names
export const getAdoptAdopt = createSelector(getAdoptState, fromAdopt.getAdopt);
export const getAdoptComments = createSelector(getAdoptState, fromAdopt.getComments);

/**
 * LostFound Reducers
 */
export const getLostFoundState = (state: State) => state.lostFound;
export const getLostFoundList = createSelector(getLostFoundState, fromLostFound.getList);
// TODO: update method and store item names
export const getLostFoundLostFound = createSelector(getLostFoundState, fromLostFound.getLostFound);
export const getLostFoundComments = createSelector(getLostFoundState, fromLostFound.getComments);

/**
 * Question Reducers
 */
export const getQuestionState = (state: State) => state.question;
export const getQuestionList = createSelector(getQuestionState, fromQuestion.getList);
// TODO: update method and store item names
export const getQuestionQuestion = createSelector(getQuestionState, fromQuestion.getQuestion);

/**
 * Notification Reducers
 */
export const getNotificationState = (state: State) => state.notification;
export const getNotificationList = createSelector(getNotificationState, fromNotification.getList);

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `rooms` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.roomsState$ = state$.select(getRoomsState);
 * 	}
 * }
 * ```
 */
export const getRoomsState = (state: State) => state.rooms;
export const getWalkersState = (state: State) => state.walkers;
export const getMessagesState = (state: State) => state.messages;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */

/**
 * Room
 * @type {Reselect.Selector<State, {[p: string]: IRoom}>}
 */
export const getRoomEntities = createSelector(getRoomsState, fromRooms.getEntities);
export const getRoomTotalEntities = createSelector(getRoomsState, fromRooms.getTotalEntities);
export const getRoomAll = createSelector(getRoomsState, fromRooms.getAll);
export const getRoomIds = createSelector(getRoomsState, fromRooms.getIds);
export const getSelectedRoomId = createSelector(getRoomsState, fromRooms.getSelectedId);
export const getSelectedRoom = createSelector(getRoomsState, fromRooms.getSelected);
export const getSelectedRoomApplications = createSelector(getRoomsState, fromRooms.getSelectedApplications);
export const getSelectedRoomReviews = createSelector(getRoomsState, fromRooms.getSelectedReviews);
export const getRoomApplicationEntities = createSelector(getRoomsState, fromRooms.getApplicationEntities);

/**
 * Walker
 * @type {Reselect.Selector<State, {[p: string]: IWalker}>}
 */
export const getWalkerEntities = createSelector(getWalkersState, fromWalkers.getEntities);
export const getWalkerTotalEntities = createSelector(getWalkersState, fromWalkers.getTotalEntities);
export const getWalkerAll = createSelector(getWalkersState, fromWalkers.getAll);
export const getWalkerIds = createSelector(getWalkersState, fromWalkers.getIds);
export const getSelectedWalkerId = createSelector(getWalkersState, fromWalkers.getSelectedId);
export const getSelectedWalker = createSelector(getWalkersState, fromWalkers.getSelected);
export const getSelectedWalkerApplications = createSelector(getWalkersState, fromWalkers.getSelectedApplications);
export const getSelectedWalkerReviews = createSelector(getWalkersState, fromWalkers.getSelectedReviews);
export const getWalkerApplicationEntities = createSelector(getWalkersState, fromWalkers.getApplicationEntities);

/**
 * Message
 * @type {Reselect.Selector<State, IMessage[]>}
 */
export const getMessageConversations = createSelector(getMessagesState, fromMessages.getConversations);
export const getMessageTotalConversations = createSelector(getMessagesState, fromMessages.getTotalConversations);
export const getMessageSelectedConversation = createSelector(getMessagesState, fromMessages.getSelectedConversation);
export const getMessageEntities = createSelector(getMessagesState, fromMessages.getEntities);

/**
 * Mixed
 * @type {Reselect.Selector<State, string>}
 */
export const getSelectedRoomMyApplications = createSelector(getAuthCurrentUser, getSelectedRoomApplications, (currentUser, apps) => {
    let filtered = { total: null, list: [] };
    if (currentUser && apps) {
      const list = apps.list.filter(application => {
        return application.consumer.id === currentUser.id || application.provider.id === currentUser.id
      });
      filtered = { total: list.length, list }
    }
    return filtered;
  });
export const getSelectedWalkerMyApplications = createSelector(getAuthCurrentUser, getSelectedWalkerApplications, (currentUser, apps) => {
  let filtered = { total: null, list: [] };
  if (currentUser && apps) {
    const list = apps.list.filter(application => {
      return application.consumer.id === currentUser.id || application.provider.id === currentUser.id
    });
    filtered = { total: list.length, list }
  }
  return filtered;
});
