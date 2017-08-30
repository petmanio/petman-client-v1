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
  selectedUser$: Observable<IUser>;
  conversations$: Observable<IMessage[]>;
  selectedUser: IUser;
  private _destroyed$ = new Subject<boolean>();
  private _selectedUserSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute) {

    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
    this.conversations$ = this._store.select(fromRoot.getMessageConversations);
    this._selectedUserSubscription = this.selectedUser$.subscribe(user => this.selectedUser = user);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._selectedUserSubscription.unsubscribe();
  }

  isMessageOwner(message: IMessage): boolean {
    if (!this.selectedUser) {
      return false;
    }
    return this.selectedUser.id === message.from['id'];
  }
}
