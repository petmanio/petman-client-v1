import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRoomApplication } from '../../models/api';

export interface IRoomApplicationsListComponent {
  checkApplicationsStatus(application: IRoomApplication, condition: 'IN_PROGRESS' | 'FINISHED' | 'WAITING'): boolean
}

@Component({
  selector: 'app-room-applications-list',
  templateUrl: './room-applications-list.component.html',
  styleUrls: ['./room-applications-list.component.scss']

})
export class RoomApplicationsListComponent implements OnInit, OnChanges, IRoomApplicationsListComponent {
  @Input() applications: IRoomApplication[];
  applicationDetailsVisibilityMap: {[id: number]: boolean} = {};
  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

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
}
