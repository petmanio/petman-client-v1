import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { INotification } from '../../models/api';
import * as moment from 'moment';

export interface INotificationsComponent {
  formatDate(date): string,
  getApplicationStatus(appStatus): string
}

@Component({
  selector: 'app-notifications',
  template: `
    <ul>
      <li *ngFor="let notification of notifications;" class="pm-cursor-pointer"
                    [ngClass]="{'selected': !notification.seen}"
                    (click)="onNotificationClick.emit(notification)">
        <div class="columns is-mobile pm-notification-row">
          <div class="column is-2">
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + notification.from.userData.avatar + ')'}"></div>&nbsp;
          </div>
          <div class="column is-10">
            <!--Sitter-->
            <div *ngIf="notification.roomApplicationCreate">
              <span class="pm-font-12 pm-color-gray pm-room-notification-status">
                <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
                applied to your application
              </span>
            </div>

            <div *ngIf="notification.roomApplicationStatusUpdate">
              <span class="pm-font-12 pm-color-gray pm-room-notification-status">
                <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
                changed application status from {{getApplicationStatus(notification.roomApplicationStatusUpdate.prevStatus)}} to
                {{getApplicationStatus(notification.roomApplicationStatusUpdate.currentStatus)}}
              </span>
            </div>

            <div *ngIf="notification.roomApplicationMessageCreate">
               <span class="pm-font-12 pm-color-gray pm-room-notification-status">
                new message from <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
              </span>
            </div>

            <!--Walker-->
            <div *ngIf="notification.walkerApplicationCreate">
              <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
                applied to your application
              </span>
            </div>

            <div *ngIf="notification.walkerApplicationStatusUpdate">
              <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
                changed application status from {{getApplicationStatus(notification.walkerApplicationStatusUpdate.prevStatus)}} to
                {{getApplicationStatus(notification.walkerApplicationStatusUpdate.currentStatus)}}
              </span>
            </div>

            <div *ngIf="notification.walkerApplicationMessageCreate">
               <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                new message from <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
              </span>
            </div>

            <div *ngIf="notification.adoptCommentCreate">
               <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                new comment from <b>{{notification.from.userData.firstName}} {{notification.from.userData.lastName}}</b>
              </span>
            </div>
            
            <div class="pm-font-12 pm-color-gray pm-room-notification-status">{{formatDate(notification.createdAt)}}</div>
          </div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .pm-notification-row {
      width: 100%;
      height: 65px;
    }

    .pm-room-notification-status {
      text-align: right;
    }

    li:hover, .selected {
      background-color: #f8f8f8;
    }

    li {
      border-bottom: 1px solid #f8f8f8;
    }

    ul {
      height: auto;
      list-style: none;
      padding-left: 0;
    }
  `]
})
export class NotificationsComponent implements OnInit, OnChanges, INotificationsComponent {
  @Input() notifications: INotification[];
  @Output() onNotificationClick = new EventEmitter();
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  formatDate(date): string {
    // TODO: use angular date filter
    return moment(date).fromNow();
  }

  getApplicationStatus(appStatus): string {
    let status: string = appStatus.toLowerCase();
    if (appStatus === 'CANCELED_BY_PROVIDER' || appStatus === 'CANCELED_BY_CONSUMER') {
      status = `Canceled`;
    } else if (appStatus === 'IN_PROGRESS') {
      status = 'In progress'
    }
    return status;
  }
}
