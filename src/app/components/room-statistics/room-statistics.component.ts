import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { IRoom, IRoomApplication } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import * as Chart from 'chart.js';
export interface IRoomRoomStatisticsComponent {
}

@Component({
  selector: 'app-room-statistics',
  template: `
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <canvas id="gauge"></canvas>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RoomStatisticsComponent implements OnInit, OnChanges, IRoomRoomStatisticsComponent {
  @Input() room: IRoom;
  @Input() applications: IRoomApplication[];

  constructor() {

  }

  ngOnInit(): void {
    // const data = {
    //   labels: [
    //     'Red',
    //     'Blue',
    //     'Yellow'
    //   ],
    //   datasets: [
    //     {
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         '#FF6384',
    //         '#36A2EB',
    //         '#FFCE56'
    //       ],
    //       hoverBackgroundColor: [
    //         '#FF6384',
    //         '#36A2EB',
    //         '#FFCE56'
    //       ]
    //     }]
    // };
    //
    // new Chart('gauge', {
    //   type: 'doughnut',
    //   data,
    //   options: {
    //     animation: {
    //       animateScale: true
    //     }
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
