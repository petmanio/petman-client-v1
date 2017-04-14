import { Component } from '@angular/core';

@Component({
  selector: 'app-nanny',
  template: `
    <div class="columns">
      <div class="column pm-became-host">
        <button md-button class="pm-fr">Became a Nanny</button>
      </div>
    </div>
    <div class="columns" *ngFor="let i of [1,2,3,4]">
      <div class="column" *ngFor="let j of [1,2,3]">
        <md-card class="room-card">
          <img md-card-image src="http://lorempixel.com/400/200/">
          <md-card-content>
            <p class="pm-font-bold">
              Cozy Two Bedroom by Opera House
            </p>
            <span class="pm-font-12">Room</span>
          </md-card-content>
          <md-card-footer>
            <div class="pm-rating-row">
              <rating [ngModel]="4 + i - j"
                      [max]="5"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="true"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['one', 'two', 'three', 'four', 'five']">
              </rating>
              <span class="pm-font-12 pm-color-gray">{{i * j}} reviews</span>
            </div>
          </md-card-footer>
        </md-card>
      </div>
    </div>
  `,
  styles: [`
    md-card-title {
      display: flex;
      justify-content: center;
    }

    .room-card .pm-rating-row {
      padding: 10px;
    }

    .pm-became-host {
      overflow: hidden;
      padding: 10px 10px 0;
    }
  `]
})
export class NannyComponent {
  constructor() {

  }
}
