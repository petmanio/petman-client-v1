import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { UtilService } from '../../services/util/util.service';

export interface IRoomApplicationMessagesComponent {
  onSendMessage(): void,
  isMessageSendDisabled(): boolean
}

@Component({
  selector: 'app-room-application-messages',
  template: `
    <div class="pm-background-lightest-gray">
      <ul class="pm-message-list">
        <li *ngFor="let message of (roomApplicationMessageList$ | async)?.list">
          <app-room-application-message
            [message]="message"
            [currentUser]="currentUser$ | async"></app-room-application-message>    
        </li>
      </ul>
      <div class="columns is-mobile pm-chart-actions">
        <div class="column is-10 is-offset-1">
          <md-input-container>
            <input mdInput 
                   [placeholder]="'type_a_message' | translate" 
                   name="message" 
                   type="text"
                   autocomplete="off"
                   [(ngModel)]="message"
                   [disabled]="isMessageSendDisabled()"
                   (keyup.enter)="onSendMessage()"/>
          </md-input-container>
        </div>
        <!--<div class="column is-1-desktop is-3-mobile">-->
          <!--<button md-icon-button -->
                  <!--(click)="onSendMessage()"-->
                  <!--[disabled]="!message || isMessageSendDisabled()">-->
            <!--<md-icon>send</md-icon>-->
          <!--</button>-->
        <!--</div>-->
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .pm-message-list {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }

    md-input-container {
      width: 100%;
    }

    .pm-chart-actions input {
      padding: 5px;
    }

  `]
})
export class RoomApplicationMessagesComponent implements OnInit, OnChanges, IRoomApplicationMessagesComponent {
  @Input() room: IRoom;
  @Input() application: IRoomApplication;

  message = '';
  roomApplicationMessageList$: Observable<any>;
  currentUser$: Observable<any>;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.roomApplicationMessageList$ = _store.select(fromRoot.getRoomApplicationMessageList);
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['application']) {
      this._store.dispatch(new roomAction.ApplicationMessageListClearAction({}));
    } else if (!changes['application'].previousValue ||
      changes['application'].previousValue.id !==  changes['application'].currentValue.id) {
      this._store.dispatch(new roomAction.ApplicationMessageListClearAction({}));
      this._store.dispatch(new roomAction.ApplicationMessageListAction({ applicationId: this.application.id }));
    }

  }

  onSendMessage(): void {
    if (this.message) {
      this._store.dispatch(new roomAction.ApplicationMessageCreateAction({ applicationId: this.application.id, message: this.message }));
      this.message = '';
    }
  }

  isMessageSendDisabled(): boolean {
    return this.application.status === 'CANCELED_BY_CONSUMER' ||
        this.application.status === 'CANCELED_BY_PROVIDER' ||
        this.application.status === 'FINISHED'
  }
}
