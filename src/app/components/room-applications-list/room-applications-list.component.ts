import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { root } from 'rxjs/util/root';
import { UtilService } from '../../services/util/util.service';

export interface IRoomApplicationsListComponent {
  getUserAvatar(application: IRoomApplication): string,
  getUserName(application: IRoomApplication): string,
  getApplicationStatus(application: IRoomApplication): string
}

@Component({
  selector: 'app-room-applications-list',
  template: `
    <ul *ngFor="let application of room?.applications; let i = index;">
      <li class="pm-cursor-pointer"
                    [ngClass]="{'selected': i === selected}"
                    (click)="onApplicationClick.emit(i)">
        <div class="columns is-mobile pm-application-row">
          <div class="column is-2">
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + getUserAvatar(application) + ')'}"></div>&nbsp;
          </div>
          <div class="column is-8">
            <span class="pm-font-14 pm-color-gray pm-room-application-status">{{getUserName(application)}}</span><br/>
            <span class="pm-font-12 pm-color-gray pm-room-application-status">{{getApplicationStatus(application)}}</span>
          </div>
          <div class="column is-2">
            <span class="pm-font-12 pm-color-gray pm-room-application-status">{{application.createdAt | date}}</span>
          </div>
        </div>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .pm-application-row {
      width: 100%;
      height: 65px;
    }

    .pm-room-application-status {
      padding-top: 14px;
    }

    li.selected {
      background-color: #f8f8f8;
    }

    ul {
      height: auto;
      list-style: none;
      padding-left: 5px;
    }
  `]
})
export class RoomApplicationsListComponent implements OnInit, OnChanges, IRoomApplicationsListComponent {
  @Input() room: IRoom;
  @Output() onApplicationClick = new EventEmitter();
  selected;
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getUserAvatar(application: IRoomApplication): string {
    let src;
    if (this.room.isOwner) {
      src = application.provider.userData.avatar;
    } else {
      src = application.consumer.userData.avatar;
    }

    return src;
  }

  getUserName(application: IRoomApplication): string {
    let name;
    if (this.room.isOwner) {
      name = `${application.provider.userData.firstName} ${application.provider.userData.lastName}`;
    } else {
      name = `${application.consumer.userData.firstName} ${application.consumer.userData.lastName}`;
    }

    return name;
  }

  getApplicationStatus(application: IRoomApplication): string {
    let status: string = application.status;
    if (this.room.isOwner) {
      if (status === 'CANCELED_BY_PROVIDER') {
        status = `Canceled by you`;
      }
      if (status === 'CANCELED_BY_CONSUMER') {
        status = `Canceled by ${application.consumer.userData.firstName} ${application.consumer.userData.lastName}`;
      }

    } else {
      if (status === 'CANCELED_BY_PROVIDER') {
        status = `Canceled by ${this.room.user.userData.firstName} ${this.room.user.userData.lastName}`;
      }
      if (status === 'CANCELED_BY_CONSUMER') {
        status = `Canceled by you`;
      }
    }

    return UtilService.capitalizeFirstChar(status);
  }
}
