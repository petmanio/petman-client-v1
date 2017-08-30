import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMessage, IMessageConversationResponse, IUser } from '../../models/api';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import * as fromRoot from '../../store';
import * as messageAction from '../../store/message/message.actions'
import { Subject } from 'rxjs/Subject';

export interface IMessageComponent {
  isMessageOwner(message: IMessage): boolean,
  onSendClick(): void
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy, IMessageComponent {
  selectedUser$: Observable<IUser>;
  conversation$: Observable<IMessageConversationResponse>;
  selectedUser: IUser;
  conversation: IMessageConversationResponse;
  message: string;
  private _destroyed$ = new Subject<boolean>();
  private _actionsSubscription: Subscription;
  private _selectedUserSubscription: Subscription;
  private _conversationSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute) {
    this._actionsSubscription = _route.params
      .select<string>('userEntityId')
      .map(id => new messageAction.SelectUniqueIdAction([localStorage.getItem('selectedUserId'), id].sort().join('_')))
      .subscribe(_store);

    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
    this.conversation$ = this._store.select(fromRoot.getMessageSelectedConversation);
    this._selectedUserSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
    this._conversationSubscription = this.conversation$.subscribe(conversation => this.conversation = conversation);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._actionsSubscription.unsubscribe();
    this._selectedUserSubscription.unsubscribe();
    this._conversationSubscription.unsubscribe();
  }

  isMessageOwner(message: IMessage): boolean {
    if (!this.selectedUser) {
      return false;
    }
    return this.selectedUser.id === message.from['id'];
  }

  onSendClick(): void {
    this._store.dispatch(new messageAction.CreateAction({
      userEntityId: this.conversation.userEntity.id,
      text: this.message
    }));
    this.message = '';
  }
}
