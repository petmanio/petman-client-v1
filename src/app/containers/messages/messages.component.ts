import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IMessage, IUser } from '../../models/api';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import * as fromRoot from '../../store';
import { Subject } from 'rxjs/Subject';

export interface IMessagesComponent {
  isMessageOwner(message: IMessage): boolean
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, IMessagesComponent {
  currentUser$: Observable<IUser>;
  conversations$: Observable<IMessage[]>;
  currentUser: IUser;
  conversations: IMessage[] = [];
  private _destroyed$ = new Subject<boolean>();
  private _currentUserSubscription: Subscription;
  private _conversationsSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute) {

    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
    this.conversations$ = this._store.select(fromRoot.getMessageConversations);
    this._currentUserSubscription = this.currentUser$.subscribe(user => this.currentUser = user);
    this._conversationsSubscription = this.conversations$.subscribe(conversations => this.conversations = conversations);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._currentUserSubscription.unsubscribe();
    this._conversationsSubscription.unsubscribe();
  }

  isMessageOwner(message: IMessage): boolean {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser.id === message.from['id'];
  }
}
