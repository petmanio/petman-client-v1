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
import { MessageService } from '../../services/message/message.service';
import * as messageAction from '../../store/message/message.actions';

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

interface IMessageEffects {
  create$: Observable<Action>,
  conversation$: Observable<Action>,
  conversations$: Observable<Action>
}

@Injectable()
export class MessageEffects implements IMessageEffects {
  @Effect() create$: Observable<Action> = this._actions$
    .ofType(messageAction.ActionTypes.CREATE)
    .map((action: messageAction.CreateAction) => action.payload)
    .switchMap(options => {
      return this._messageService.create(options)
        .map(response => new messageAction.CreateSuccessAction(response))
        .catch(err => of(new messageAction.CreateErrorAction(err)))
    });

  @Effect() conversation$: Observable<Action> = this._actions$
    .ofType(messageAction.ActionTypes.CONVERSATION)
    .map((action: messageAction.ConversationAction) => action.payload)
    .switchMap(options => {
      return this._messageService.getConversation(options)
        .map(response => new messageAction.ConversationSuccessAction(response))
        .catch(err => of(new messageAction.ConversationErrorAction(err)))
    });

  @Effect() conversations$: Observable<Action> = this._actions$
    .ofType(messageAction.ActionTypes.CONVERSATIONS)
    .map((action: messageAction.ConversationsAction) => action.payload)
    .switchMap(options => {
      return this._messageService.getConversations(options)
        .map(response => new messageAction.ConversationsSuccessAction(response))
        .catch(err => of(new messageAction.ConversationsErrorAction(err)))
    });

  constructor(private _actions$: Actions,
              private _messageService: MessageService) {}

}
