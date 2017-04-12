import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILocation } from '../../models/api';

export interface ILocationItemComponent {

}

@Component({
  selector: 'app-location',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{location.name}}</md-card-title>
        <md-card-subtitle>{{location.description}}</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="location.thumbnail">
      <md-card-actions>
        <button md-button (click)="onShowPin.emit(location)">Show on map</button>
      </md-card-actions>
    </md-card>
  `,
  styles: [`

  `]
})
export class LocationItemComponent implements ILocationItemComponent {
  @Input() location: ILocation;
  @Output() onShowPin = new EventEmitter();
  constructor() {

  }
}
