import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { WalkerService } from '../../services/walker/walker.service';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class WalkerExistsGuard implements CanActivate {
  constructor(private _router: Router,
              private _store: Store<fromRoot.State>,
              private _walkerService: WalkerService) { }


  /**
   * This method checks if a walker with the given ID is already registered
   * in the Store
   */
  hasWalkerInStore(id: string): Observable<boolean> {
    return this._store.select(fromRoot.getWalkerEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  /**
   * This method loads a walker with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasWalkerInApi(id: string): Observable<boolean> {
    return this._walkerService.getById({ walkerId: id })
      .map(walkerEntity => new walkerAction.LoadSuccessAction(walkerEntity))
      .do((action: walkerAction.LoadSuccessAction) => this._store.dispatch(action))
      .map(walker => !!walker)
      .catch(() => {
        this._router.navigate(['/404']);
        return of(false);
      });
  }

  /**
   * `hasWalker` composes `hasWalkerInStore` and `hasWalkerInApi`. It first checks
   * if the walker is in store, and if not it then checks if it is in the
   * API.
   */
  hasWalker(id: string): Observable<boolean> {
    return this.hasWalkerInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasWalkerInApi(id);
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a walker from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<any> {
    return this.hasWalker(route.params['walkerId']);
  }
}
