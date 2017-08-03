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
import { QuestionService } from '../../services/question/question.service';
import * as questionAction from '../../store/question/question.actions';

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

interface IQuestionEffects {
  getById$: Observable<Action>,
  delete$: Observable<Action>,
  list$: Observable<Action>,
  create$: Observable<Action>
}

@Injectable()
export class QuestionEffects implements IQuestionEffects {
  @Effect() getById$: Observable<Action> = this._actions$
    .ofType(questionAction.ActionTypes.GET_BY_ID)
    .map((action: questionAction.GetByIdAction) => action.payload)
    .switchMap(options => {
      return this._questionService.getById(options)
        .map(response => new questionAction.GetByIdSuccessAction(response))
        .catch(err => of(new questionAction.GetByIdErrorAction(err)))
    });

  @Effect() delete$: Observable<Action> = this._actions$
    .ofType(questionAction.ActionTypes.DELETE)
    .map((action: questionAction.DeleteAction) => action.payload)
    .switchMap(options => {
      return this._questionService.deleteById(options)
        .map(response => new questionAction.DeleteSuccessAction(response))
        .catch(err => of(new questionAction.DeleteErrorAction(err)))
    });

  @Effect() list$: Observable<Action> = this._actions$
    .ofType(questionAction.ActionTypes.LIST)
    .map((action: questionAction.ListAction) => action.payload)
    .switchMap(options => {
      return this._questionService.list(options)
        .map(response => new questionAction.ListSuccessAction(response))
        .catch(err => of(new questionAction.ListErrorAction(err)))
    });

  @Effect() create$: Observable<Action> = this._actions$
    .ofType(questionAction.ActionTypes.CREATE)
    .map((action: questionAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._questionService.create(options)
        .map(response => new questionAction.CreateSuccessAction(response))
        .catch(err => of(new questionAction.CreateErrorAction(err)))
    });

  constructor(private _actions$: Actions,
              private _questionService: QuestionService) {}

}
