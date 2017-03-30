import { Component, Input } from '@angular/core';
import { IShop } from '../../models/api';

export interface IShopItemComponent {

}

@Component({
  selector: 'app-shop-item',
  template: `
    <md-card>
      <md-card-header>
        <md-card-title>{{shop.source}}</md-card-title>
        <md-card-subtitle>{{shop.name}}</md-card-subtitle>
      </md-card-header>
      <img md-card-image [src]="shop.thumbnail">
      <!--<a [href]="shop.link" target="_blank"><img md-card-image [src]="shop.thumbnail"></a>-->
      <md-card-content>
        <p>{{shop.description}}</p>
      </md-card-content>
      <!--<md-card-actions>-->
        <!--<button md-button>LIKE</button>-->
        <!--<button md-button>SHARE</button>-->
        <!--<a md-button [href]="shop.link" target="_blank">READ</a>-->
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
