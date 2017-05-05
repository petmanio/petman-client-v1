export { AuthEffects } from './auth/auth.effects';
export { BlogEffects } from './blog/blog.effects';
export { RoomEffects } from './room/room.effects';
export { WalkerEffects } from './walker/walker.effects';
export { NotificationEffects } from './notification/notification.effects';
export { LocationEffects } from './location/location.effects';

import { EffectsModule } from '@ngrx/effects';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


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
import * as fromRoom from './room/room.reducer';
import * as fromWalker from './walker/walker.reducer';
import * as fromNotification from './notification/notification.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth: fromAuth.State,
  blog: fromBlog.State,
  location: fromLocation.State,
  room: fromRoom.State,
  walker: fromWalker.State,
  notification: fromNotification.State,
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
  room: fromRoom.reducer,
  walker: fromWalker.reducer,
  notification: fromNotification.reducer,
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
 * first select the auth state then we pass the state to the book
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
export const getAuthLogin = createSelector(getAuthState, fromAuth.getLogin);
export const getAuthLoginData = createSelector(getAuthLogin, fromAuth.getLoginData);
export const getAuthLoginError = createSelector(getAuthLogin, fromAuth.getLoginError);
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
export const getBlogListData = createSelector(getBlogList, fromBlog.getListData);
export const getBlogListError = createSelector(getBlogList, fromBlog.getListError);
// TODO: remove error from state

/**
 * Location Reducers
 */
export const getLocationState = (state: State) => state.location;
export const getLocationList = createSelector(getLocationState, fromLocation.getList);
export const getLocationFilters = createSelector(getLocationState, fromLocation.getFilters);
export const getLocationPins = createSelector(getLocationState, fromLocation.getPins);

/**
 * Room Reducers
 */
export const getRoomState = (state: State) => state.room;
export const getRoomList = createSelector(getRoomState, fromRoom.getList);
// TODO: update method and store item names
export const getRoomRoom = createSelector(getRoomState, fromRoom.getRoom);
export const getRoomApplicationMessageList = createSelector(getRoomState, fromRoom.getApplicationMessageList);

/**
 * Walker Reducers
 */
export const getWalkerState = (state: State) => state.walker;
export const getWalkerList = createSelector(getWalkerState, fromWalker.getList);
// TODO: update method and store item names
export const getWalkerWalker = createSelector(getWalkerState, fromWalker.getWalker);
export const getWalkerApplicationMessageList = createSelector(getWalkerState, fromWalker.getApplicationMessageList);

/**
 * Notification Reducers
 */
export const getNotificationState = (state: State) => state.notification;
export const getNotificationList = createSelector(getNotificationState, fromNotification.getList);
