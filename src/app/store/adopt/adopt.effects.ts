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
import { AdoptService } from '../../services/adopt/adopt.service';
import * as adoptAction from '../../store/adopt/adopt.actions';

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

interface IAdoptEffects {
  getById$: Observable<Action>,
  delete$: Observable<Action>,
  list$: Observable<Action>,
  create$: Observable<Action>,
  commentList$: Observable<Action>,
  commentListLoadMore$: Observable<Action>,
  commentCreate$: Observable<Action>,
}

@Injectable()
export class AdoptEffects implements IAdoptEffects {
  @Effect() getById$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.GET_BY_ID)
    .map((action: adoptAction.GetByIdAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.getById(options)
        .map(response => new adoptAction.GetByIdSuccessAction(response))
        .catch(err => of(new adoptAction.GetByIdErrorAction(err)))
    });

  @Effect() delete$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.DELETE)
    .map((action: adoptAction.DeleteAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.deleteById(options)
        .map(response => new adoptAction.DeleteSuccessAction(response))
        .catch(err => of(new adoptAction.DeleteErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.LIST)
    .map((action: adoptAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.list(options)
        .map(response => new adoptAction.ListSuccessAction(response))
        .catch(err => of(new adoptAction.ListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.CREATE)
    .map((action: adoptAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.create(options)
        .map(response => new adoptAction.CreateSuccessAction(response))
        .catch(err => of(new adoptAction.CreateErrorAction(err)))
    });

  @Effect() commentList$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.COMMENT_LIST)
    .map((action: adoptAction.CommentListAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.getCommentList(options)
        .map(response => new adoptAction.CommentListSuccessAction(response))
        .catch(err => of(new adoptAction.CommentListErrorAction(err)))
    });


  @Effect() commentListLoadMore$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.COMMENT_LIST_LOAD_MORE)
    .map((action: adoptAction.CommentListLoadMoreAction) => action.payload)
    .switchMap(options => {
      return this._adoptService.getCommentList(options)
        .map(response => new adoptAction.CommentListLoadMoreSuccessAction(response))
        .catch(err => of(new adoptAction.CommentListLoadMoreErrorAction(err)))
    });

  @Effect() commentCreate$: Observable<Action> = this._actions$
    .ofType(adoptAction.ActionTypes.COMMENT_CREATE)
    .map((action: adoptAction.CommentCreateAction) => action.payload)
    .switchMap(options => {
      // TODO: check complete action
      return this._adoptService.commentCreate(options)
    });

  constructor(private _actions$: Actions,
              private _adoptService: AdoptService) {}

}
