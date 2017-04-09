import { Component, Input } from '@angular/core';
import { IPetCare } from '../../models/api';

export interface IPetCareItemComponent {

}

@Component({
  selector: 'app-pet-care-item',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{petCare.name}}</md-card-title>
        <md-card-subtitle>Marshal Baghramyan Ave.</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="petCare.thumbnail">
      <md-card-content>
        <p>{{petCare.description}}</p>
      </md-card-content>
    </md-card>
  `,
  styles: [`

  `]
})
export class PetCareItemComponent implements IPetCareItemComponent {
  @Input() petCare: IPetCare;
  constructor() {

  }
}
