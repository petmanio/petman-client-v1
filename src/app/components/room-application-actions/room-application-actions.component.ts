import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';

export interface IRoomApplicationActionsComponent {

}

@Component({
  selector: 'app-room-application-actions',
  template: `
    <div class="columns is-mobile pm-background-lightest-gray">
      <div class="column is-9"></div>
      <div class="column is-3">
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
  `]
})
export class RoomApplicationActionsComponent {
  @Input() room: IRoom;
  @Input() application: IRoomApplication;
  @Output() onActionClick = new EventEmitter();
  constructor() {

  }
}
