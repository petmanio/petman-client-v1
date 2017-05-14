import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWalker, IWalkerApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

export interface IWalkerApplicationActionsComponent {
  getApplicationStatus(application: IWalkerApplication): string
}

@Component({
  selector: 'app-walker-application-actions',
  template: `
    <div class="columns pm-application-actions is-mobile pm-background-lightest-gray">
      <div class="column">
        <span class="pm-color-gray pm-font-16 pm-application-status">{{getApplicationStatus(application)}}</span>
        <button md-button class="pm-fr" *ngIf="application.status === 'IN_PROGRESS' && walker.isOwner" 
                (click)="onActionClick.emit('CONFIRMED')">
          Confirm
        </button>
        <button md-button class="pm-fr" *ngIf="application.status === 'CONFIRMED'" (click)="onActionClick.emit('FINISHED')">
          Finish
        </button>
        <button md-button class="pm-fr" color="warn" *ngIf="application.status === 'IN_PROGRESS'"
                (click)="onActionClick.emit(walker.isOwner ? 'CANCELED_BY_PROVIDER' : 'CANCELED_BY_CONSUMER')">
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
export class WalkerApplicationActionsComponent {
  @Input() walker: IWalker;
  @Input() application: IWalkerApplication;
  @Output() onActionClick = new EventEmitter();
  constructor() {

  }

  getApplicationStatus(application: IWalkerApplication): string {
    let status: string = UtilService.capitalizeFirstChar(application.status);
    if (application.status === 'IN_PROGRESS') {
      status = 'In progress';
    }
    if (this.walker.isOwner) {
      if (application.status === 'CANCELED_BY_PROVIDER') {
        status = `Canceled by you`;
      }
      if (application.status === 'CANCELED_BY_CONSUMER') {
        status = `Canceled by ${application.consumer.userData.firstName} ${application.consumer.userData.lastName}`;
      }

    } else {
      if (application.status === 'CANCELED_BY_PROVIDER') {
        status = `Canceled by ${this.walker.user.userData.firstName} ${this.walker.user.userData.lastName}`;
      }
      if (application.status === 'CANCELED_BY_CONSUMER') {
        status = `Canceled by you`;
      }
    }

    return status;
  }
}
