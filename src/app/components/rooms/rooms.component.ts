import { Component } from '@angular/core';

export interface IRoomsComponent {

}

@Component({
  selector: 'app-rooms',
  template: `
    <div class="columns">
      <div class="column pm-became-host">
        <a md-button class="pm-fr" routerLink="/room/add">Became a Nanny</a>
      </div>
    </div>
    <div class="columns" *ngFor="let i of [1,2,3,4]">
      <div class="column" *ngFor="let j of [1,2,3]">
        <app-room></app-room>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }

    .pm-became-host {
      overflow: hidden;
      padding-top: 10px;
      padding-bottom: 0;
    }
  `]
})
export class RoomsComponent implements IRoomsComponent {
  constructor() {

  }
}
