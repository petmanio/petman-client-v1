import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { UtilService } from '../../services/util/util.service';
import { SailsService } from 'angular2-sails';
import { environment } from '../../../environments/environment';


export interface IRoomApplicationMessagesComponent {
  onSendMessage(): void,
  isMessageSendDisabled(): boolean
}

@Component({
  selector: 'app-room-application-messages',
  template: `
    <div class="pm-background-lightest-gray">
      <ul class="pm-message-list">
        <app-room-application-message 
          *ngFor="let message of (roomApplicationMessageList$ | async)?.list"
          [message]="message"></app-room-application-message>
      </ul>
      <div class="columns is-mobile pm-chart-actions">
        <div class="column">
          <md-input-container>
            <input mdInput placeholder="Type a message" name="message" [(ngModel)]="message" 
                   [disabled]="isMessageSendDisabled()"
                   (keyup.enter)="onSendMessage()"/>
          </md-input-container>
        </div>
        <!--<div class="column is-2"><button md-button (click)="onSendMessage()">Send</button></div>-->
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
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService,
              private _sailsService: SailsService) {
    this.roomApplicationMessageList$ = _store.select(fromRoot.getRoomApplicationMessageList);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['application'].previousValue || changes['application'].previousValue.id !==  changes['application'].currentValue.id) {
      this._store.dispatch(new roomAction.ApplicationMessageListClearAction({}));
      this._store.dispatch(new roomAction.ApplicationMessageListAction({ applicationId: this.application.id }));
      this._store.dispatch(new roomAction.ApplicationMessageJoinAction({ applicationId: this.application.id }));
    }

  }

  onSendMessage(): void {
    this._store.dispatch(new roomAction.ApplicationMessageCreateAction({ applicationId: this.application.id, message: this.message }));
    this.message = '';
  }

  isMessageSendDisabled(): boolean {
    return this.application.status === 'CANCELED_BY_CONSUMER' ||
        this.application.status === 'CANCELED_BY_PROVIDER' ||
        this.application.status === 'FINISHED'
  }
}
