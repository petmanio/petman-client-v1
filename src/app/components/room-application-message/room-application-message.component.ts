import { Component, Input, OnInit } from '@angular/core';
import { IRoomApplicationMessage, IUser } from '../../models/api';
import * as moment from 'moment';

export interface IRoomApplicationMessageComponent {
  getMessageDateFromNow(date): string,
  isMessageOwner(): boolean
}

@Component({
  selector: 'app-room-application-message',
  template: `
    <div class="columns is-mobile pm-message-row" *ngIf="isMessageOwner()">
      <div class="column">
        <div class="pm-message-text pm-background-blue">
          <span class="pm-font-12 pm-color-white">{{message.message}}</span>
        </div>
        <div class="pm-font-10 pm-color-gray pm-message-time">{{getMessageDateFromNow(message.createdAt)}}</div>
      </div>
    </div>
    <div class="columns is-mobile pm-message-row" *ngIf="!isMessageOwner()">
      <div class="column is-1-desktop is-2-mobile">
        <div md-card-avatar class="pm-cart-avatar"
             [ngStyle]="{'background-image': 'url(' + message.from.userData.avatar + ')'}"></div>&nbsp;
      </div>
      <div class="column is-11-desktop is-9-mobile">
        <div class="pm-message-text pm-background-light-gray">
          <span class="pm-font-12 pm-color-gray">{{message.message}}</span>
        </div>
        <div class="pm-font-10 pm-color-gray pm-message-time">{{getMessageDateFromNow(message.createdAt)}}</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .pm-message-row {
      width: 100%;
    }

    .pm-message-text {
      padding: 10px;
    }

    md-input-container {
      width: 100%;
    }

    .pm-chart-actions input {
      padding: 5px;
    }

    .pm-message-time {
      text-align: right;
    }

  `]
})
export class RoomApplicationMessageComponent implements OnInit, IRoomApplicationMessageComponent{
  @Input() message: IRoomApplicationMessage;
  @Input() currentUser: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

  getMessageDateFromNow(date): string {
    return moment(date).fromNow();
  }

  isMessageOwner(): boolean {
    return this.currentUser.id === this.message.from['id'];
  }
}
