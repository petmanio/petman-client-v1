import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NotificationService } from '../../services/notification/notification.service';
import * as fromRoot from '../../store';
import * as notificationAction from './/notification.actions';

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

interface INotificationEffects {
  getCount$: Observable<Action>,
  list$: Observable<Action>
}

@Injectable()
export class NotificationEffects implements INotificationEffects {
  constructor(private actions$: Actions, private notificationService: NotificationService, private store: Store<fromRoot.State>) { }

  @Effect()
  public getCount$: Observable<Action> = this.actions$
    .ofType(notificationAction.ActionTypes.GET_COUNT)
    .map((action: notificationAction.GetCountAction) => action.payload)
    .switchMap(options => {
      return this.notificationService.count(options)
        .map(response => new notificationAction.GetCountCompleteAction(response))
        .catch(err => of(new notificationAction.GetCountErrorAction(err)))
    });

  @Effect()
  public list$: Observable<Action> = this.actions$
    .ofType(notificationAction.ActionTypes.LIST)
    .map((action: notificationAction.ListAction) => action.payload)
    .switchMap(options => {
      return this.notificationService.list(options)
        .map(response => new notificationAction.ListCompleteAction(response))
        .catch(err => of(new notificationAction.ListErrorAction(err)))
    });

}
