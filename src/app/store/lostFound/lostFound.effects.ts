import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LostFoundService } from '../../services/lostFound/lostFound.service';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

interface ILostFoundEffects {
  getById$: Observable<Action>,
  deleteById$: Observable<Action>,
  list$: Observable<Action>,
  create$: Observable<Action>,
  commentList$: Observable<Action>,
  commentListLoadMore$: Observable<Action>,
  commentCreate$: Observable<Action>,
}

@Injectable()
export class LostFoundEffects implements ILostFoundEffects {
  @Effect() getById$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.GET_BY_ID)
    .map((action: lostFoundAction.GetByIdAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.getById(options)
        .map(response => new lostFoundAction.GetByIdCompleteAction(response))
        .catch(err => of(new lostFoundAction.GetByIdErrorAction(err)))
    });

  @Effect() deleteById$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.DELETE_BY_ID)
    .map((action: lostFoundAction.DeleteByIdAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.deleteById(options)
        .map(response => new lostFoundAction.DeleteByIdCompleteAction(response))
        .catch(err => of(new lostFoundAction.DeleteByIdErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.LIST)
    .map((action: lostFoundAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.list(options)
        .map(response => new lostFoundAction.ListCompleteAction(response))
        .catch(err => of(new lostFoundAction.ListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.CREATE)
    .map((action: lostFoundAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.create(options)
        .map(response => new lostFoundAction.CreateCompleteAction(response))
        .catch(err => of(new lostFoundAction.CreateErrorAction(err)))
    });

  @Effect() commentList$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.COMMENT_LIST)
    .map((action: lostFoundAction.CommentListAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.getCommentList(options)
        .map(response => new lostFoundAction.CommentListCompleteAction(response))
        .catch(err => of(new lostFoundAction.CommentListErrorAction(err)))
    });


  @Effect() commentListLoadMore$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.COMMENT_LIST_LOAD_MORE)
    .map((action: lostFoundAction.CommentListLoadMoreAction) => action.payload)
    .switchMap(options => {
      return this._lostFoundService.getCommentList(options)
        .map(response => new lostFoundAction.CommentListLoadMoreCompleteAction(response))
        .catch(err => of(new lostFoundAction.CommentListLoadMoreErrorAction(err)))
    });

  @Effect() commentCreate$: Observable<Action> = this._actions$
    .ofType(lostFoundAction.ActionTypes.COMMENT_CREATE)
    .map((action: lostFoundAction.CommentCreateAction) => action.payload)
    .switchMap(options => {
      // TODO: check complete action
      return this._lostFoundService.commentCreate(options)
    });

  constructor(private _actions$: Actions,
              private _lostFoundService: LostFoundService) {}

}
