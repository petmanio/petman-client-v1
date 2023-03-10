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
import { BlogService } from '../../services/blog/blog.service';
import * as blogAction from '../../store/blog/blog.actions';

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

interface IBlogEffects {
  list$: Observable<Action>
  listLoadMore$: Observable<Action>
}

@Injectable()
export class BlogEffects implements IBlogEffects {
  @Effect()
  public list$: Observable<Action> = this._actions$
    .ofType(blogAction.ActionTypes.LIST)
    .map((action: blogAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._blogService.list(options)
        .map(response => new blogAction.ListSuccessAction(response))
        .catch(err => of(new blogAction.ListErrorAction(err)))
    });

  @Effect()
  public listLoadMore$: Observable<Action> = this._actions$
    .ofType(blogAction.ActionTypes.LIST_LOAD_MORE)
    .map((action: blogAction.ListLoadMoreAction) => action.payload)
    .switchMap(options => {
      return this._blogService.list(options)
        .map(response => new blogAction.ListLoadMoreSuccessAction(response))
        .catch(err => of(new blogAction.ListLoadMoreErrorAction(err)))
    });

  constructor(private _actions$: Actions, private _blogService: BlogService) { }
}
