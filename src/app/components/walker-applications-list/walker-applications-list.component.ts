import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { IWalker, IWalkerApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';

export interface IWalkerApplicationsListComponent {
  getApplicationStatus(application: IWalkerApplication): string,
  formatDate(date): string
}

@Component({
  selector: 'app-walker-applications-list',
  template: `
    <ul>
      <li *ngFor="let application of applications; let i = index;" class="pm-cursor-pointer"
          [ngClass]="{'selected': i === selected}"
          (click)="onApplicationClick.emit(application); selected = i">
        <div class="columns is-mobile pm-application-row">
          <div class="column is-2">
            <div md-card-avatar class="pm-cart-avatar"
                 [ngStyle]="{'background-image': 'url(' + application.consumer.userData.avatar + ')'}"></div>&nbsp;
          </div>
          <div class="column is-10">
            <div>
              <span class="pm-font-14 pm-color-gray pm-walker-application-status">
                {{application.consumer.userData.firstName}} {{application.consumer.userData.lastName}}
              </span><br/>
              <span class="pm-font-12 pm-color-gray pm-walker-application-status">
                 {{application.status | translate}}
              </span>
            </div>
            <div class="pm-font-12 pm-color-gray pm-walker-application-status">{{formatDate(application.createdAt)}}</div>
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

    .pm-walker-application-status {
      text-align: right;
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
export class WalkerApplicationsListComponent implements OnInit, OnChanges, IWalkerApplicationsListComponent {
  @Input() walker: IWalker;
  @Input() applications: IWalkerApplication[];
  @Output() onApplicationClick = new EventEmitter();
  selected;
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getApplicationStatus(application: IWalkerApplication): string {
    // TODO: update canceled translation
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

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }
}
