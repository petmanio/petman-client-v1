import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';

export interface IRoomApplicationsListComponent {
}

@Component({
  selector: 'app-room-applications-list',
  template: `
    <md-list>
      <div *ngFor="let application of room?.applications; let i = index;">
        <md-list-item class="pm-cursor-pointer" 
                      [ngClass]="{'selected': i === selected}"
                      (click)="onApplicationClick.emit(i)">
          <div class="columns is-mobile pm-application-row">
            <div class="column">
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (room.isOwner ? application.provider.userData.avatar 
                   : application.consumer.userData.avatar) + ')'}"></div>&nbsp;
            </div>
            <div class="column is-8">
              <div class="pm-font-12 pm-color-gray pm-room-application-status">{{application.status}}</div>
            </div>
            <div class="column is-2">
              <button md-icon-button>
                <md-icon>info_outline</md-icon>
              </button>
            </div>
          </div>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .pm-application-row {
      width: 100%;
      padding-top: 20px;
    }

    .pm-room-application-status {
      padding-top: 14px;
    }

    md-list-item.selected .pm-room-application-status, md-list-item.selected button {
      color: #8b59e4;
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
}
