import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { LocationService } from '../../services/location/location.service';
import * as fromRoot from '../../store';
import * as locationAction from '../../store/location/location.actions';

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

interface ILocationEffects {
  filters$: Observable<Action>,
  list$: Observable<Action>,
  pins$: Observable<Action>
}

@Injectable()
export class LocationEffects implements ILocationEffects {
  constructor(private actions$: Actions, private locationService: LocationService, private store: Store<fromRoot.State>) { }

  @Effect()
  public filters$: Observable<Action> = this.actions$
    .ofType(locationAction.ActionTypes.FILTERS)
    .map((action: locationAction.FiltersAction) => action.payload)
    .switchMap(options => {
      return this.locationService.filters(options)
        .map(response => new locationAction.FiltersCompleteAction(response))
        .catch(err => of(new locationAction.ListErrorAction(err)))
    });

  @Effect()
  public list$: Observable<Action> = this.actions$
    .ofType(locationAction.ActionTypes.LIST)
    .map((action: locationAction.ListAction) => action.payload)
    .switchMap(options => {
      return this.locationService.list(options)
        .map(response => new locationAction.ListCompleteAction(response))
        .catch(err => of(new locationAction.ListErrorAction(err)))
    });

  @Effect()
  public pins$: Observable<Action> = this.actions$
    .ofType(locationAction.ActionTypes.PINS)
    .map((action: locationAction.PinsAction) => action.payload)
    .switchMap(options => {
      return this.locationService.pins(options)
        .map(response => new locationAction.PinsCompleteAction(response))
        .catch(err => of(new locationAction.PinsErrorAction(err)))
    });
}
