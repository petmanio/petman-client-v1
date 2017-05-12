import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILocation } from '../../models/api';

// TODO: rename
export interface ILocationItemComponent {

}

@Component({
  selector: 'app-location',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{location.name}}</md-card-title>
        <md-card-subtitle>{{location.description}}</md-card-subtitle>
        <button md-icon-button class="pm-room-action-show-map" (click)="onShowPin.emit(location)">
          <md-icon class="pm-font-16 pm-color-blue">location_on</md-icon>
        </button>
      </md-card-header>
      <md-divider></md-divider><br/>
      <img md-card-image [src]="location.thumbnail">
    </md-card>
  `,
  styles: [`
    .pm-room-action-show-map {
      margin-left: auto;
    }
  `]
})
export class LocationItemComponent implements ILocationItemComponent {
  @Input() location: ILocation;
  @Output() onShowPin = new EventEmitter();
  constructor() {

  }
}
