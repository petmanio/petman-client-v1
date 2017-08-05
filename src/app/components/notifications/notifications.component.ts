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
                {{'new_request_from' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <div *ngIf="notification.roomApplicationStatusUpdate">
              <span class="pm-font-12 pm-color-gray pm-room-notification-status">
                <!--TODO: add status text-->
      {{'application_status_update' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <div *ngIf="notification.roomApplicationRate">
              <span class="pm-font-12 pm-color-gray pm-room-notification-status">
                <!--TODO: add review text and rating-->
      {{'application_rate' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <!--Walker-->
            <div *ngIf="notification.walkerApplicationCreate">
              <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                {{'new_request_from' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <div *ngIf="notification.walkerApplicationStatusUpdate">
              <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
               <!--TODO: add status text-->
      {{'application_status_update' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <div *ngIf="notification.walkerApplicationMessageCreate">
               <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                {{'new_message_from' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <!--Adopt-->
            <div *ngIf="notification.adoptCommentCreate">
               <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                {{'new_comment_from' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
              </span>
            </div>

            <!--LostFound-->
            <div *ngIf="notification.lostFoundCommentCreate">
               <span class="pm-font-12 pm-color-gray pm-walker-notification-status">
                {{'new_comment_from' | translate:{name: notification.from.userData.firstName + ' ' + notification.from.userData.lastName} }}
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
    } else if (appStatus === 'WAITING') {
      status = 'In progress'
    }
    return status;
  }
}
