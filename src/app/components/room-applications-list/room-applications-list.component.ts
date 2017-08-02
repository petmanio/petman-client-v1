import { Component, Input, OnInit } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';

export interface IRoomApplicationsListComponent {
  checkApplicationsStatus(application: IRoomApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean,
  onChangeStatus(application: IRoomApplication, status: 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER'| 'FINISHED' | 'IN_PROGRESS'): void,
  onRateClick(application: IRoomApplication): void
}

@Component({
  selector: 'app-room-applications-list',
  templateUrl: './room-applications-list.component.html',
  styleUrls: ['./room-applications-list.component.scss']

})
export class RoomApplicationsListComponent implements OnInit, IRoomApplicationsListComponent {
  @Input() applications: IRoomApplication[];
  @Input() room: IRoom;
  activeApplicationId: number;
  constructor() {

  }

  ngOnInit(): void {

  }

  checkApplicationsStatus(application: IRoomApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean {
    let status = false;
    switch (condition) {
      case 'IN_PROGRESS':
        status = application.status === 'IN_PROGRESS';
        break;
      case 'WAITING':
        status = application.status === 'WAITING';
        break;
      case 'FINISHED':
        status = ['CANCELED_BY_PROVIDER', 'CANCELED_BY_CONSUMER', 'FINISHED'].indexOf(application.status) !== -1;
        break;
    }

    return status;
  }

  onChangeStatus(application: IRoomApplication, status: 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER'| 'FINISHED' | 'IN_PROGRESS'): void {

  }

  onRateClick(application: IRoomApplication): void {

  }
}
