import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

export interface IRoomApplicationActionsComponent {
  getApplicationStatus(application: IRoomApplication): string
}

@Component({
  selector: 'app-room-application-actions',
  template: `
    <div class="columns pm-application-actions is-mobile pm-background-lightest-gray">
      <div class="column">
        <span class="pm-color-gray pm-font-16 pm-application-status">{{getApplicationStatus(application)}}</span>
        <button md-button class="pm-fr" *ngIf="application.status === 'WAITING' && room.isOwner" (click)="onActionClick.emit('CONFIRMED')">
          Confirm
        </button>
        <button md-button class="pm-fr" color="warn" *ngIf="application.status === 'WAITING'"
                (click)="onActionClick.emit(room.isOwner ? 'CANCELED_BY_PROVIDER' : 'CANCELED_BY_CONSUMER')">
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .pm-application-actions {
      height: 60px;
    }
    
    .pm-application-status {
      margin-top: 10px;
      display: inline-block;
    }
  `]
})
export class RoomApplicationActionsComponent {
  @Input() room: IRoom;
  @Input() application: IRoomApplication;
  @Output() onActionClick = new EventEmitter();
  constructor() {

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