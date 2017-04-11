import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPetCare } from '../../models/api';

export interface IPetCareItemComponent {

}

@Component({
  selector: 'app-pet-care-item',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{petCare.name}}</md-card-title>
        <md-card-subtitle>{{petCare.description}}</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="petCare.thumbnail">
      <md-card-actions>
        <button md-button (click)="onShowPin.emit(petCare)">Show on map</button>
      </md-card-actions>
    </md-card>
  `,
  styles: [`

  `]
})
export class PetCareItemComponent implements IPetCareItemComponent {
  @Input() petCare: IPetCare;
  @Output() onShowPin = new EventEmitter();
  constructor() {

  }
}
