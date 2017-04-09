import { Component, Input } from '@angular/core';
import { IShop } from '../../models/api';
import { mapStyles } from '../../../util';

export interface IShopItemComponent {

}

@Component({
  selector: 'app-shop-item',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{shop.name}}</md-card-title>
        <md-card-subtitle>Marshal Baghramyan Ave.</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="shop.thumbnail">
      <md-card-content>
        <p>{{shop.description}}</p>
      </md-card-content>
      <!--<md-card-actions>-->
        <!--<button md-button (click)="showMap = !showMap">MAP</button>-->
      <!--</md-card-actions>-->
    </md-card>
  `,
  styles: [`

  `]
})
export class ShopItemComponent implements IShopItemComponent {
  @Input() shop: IShop;
  constructor() {

  }
}
