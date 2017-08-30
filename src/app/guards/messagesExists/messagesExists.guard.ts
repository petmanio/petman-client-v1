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

import { MessageService } from '../../services/message/message.service';
import * as fromRoot from '../../store';
import * as messageAction from '../../store/message/message.actions';

// TODO: use resolvers

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MessagesExistsGuard implements CanActivate {
  constructor(private _router: Router,
              private _store: Store<fromRoot.State>,
              private _messageService: MessageService) { }


  /**
   * This method checks if a message with the given ID is already registered
   * in the Store
   */
  hasMessagesInStore(): Observable<boolean> {
    return this._store.select(fromRoot.getMessageTotalConversations)
      .map(total => typeof total === 'number')
      .take(1)
  }

  /**
   * This method loads a message with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasMessagesInApi(): Observable<boolean> {
    return this._messageService.getConversations({})
      .map(conversations => new messageAction.ConversationsSuccessAction(conversations))
      .do((action: messageAction.ConversationsSuccessAction) => this._store.dispatch(action))
      .map(conversations => !!conversations)
      .catch(() => {
        this._router.navigate(['/404']);
        return of(false);
      });
  }

  /**
   * `hasMessages` composes `hasMessagesInStore` and `hasMessagesInApi`. It first checks
   * if the message is in store, and if not it then checks if it is in the
   * API.
   */
  hasMessages(): Observable<boolean> {
    return this.hasMessagesInStore()
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasMessagesInApi();
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a message from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<any> {
    return this.hasMessages();
  }
}
