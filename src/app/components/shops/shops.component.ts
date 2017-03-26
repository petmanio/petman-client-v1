import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as shopAction from '../../store/shop/shop.actions';
import { mapStyles } from '../../../util';
import { SebmGoogleMap } from 'angular2-google-maps/core';

export interface IShopsComponent {}

@Component({
  selector: 'app-shops',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-tab-group (selectChange)="tabSelectChange()">
      <md-tab label="List view">
        <div class="shop-list" infinite-scroll
             (scrolled)="onScroll()"
             [infiniteScrollDistance]="2"
             [infiniteScrollThrottle]="300"
             [scrollWindow]="false">
          <div class="columns" *ngFor="let shopRow of (shopListData$ | async)?.list | chunk:4">
            <div class="column" *ngFor="let shop of shopRow">
              <md-card>
                <md-card-header>
                  <md-card-title>{{shop.source}}</md-card-title>
                  <!--<md-card-subtitle>{{shop.date | date: 'dd/MM/yyyy'}}</md-card-subtitle>-->
                </md-card-header>
                <img md-card-image [src]="shop.thumbnail">
                <!--<a [href]="shop.link" target="_blank"><img md-card-image [src]="shop.thumbnail"></a>-->
                <md-card-content>
                  <p>{{shop.description}}</p>
                </md-card-content>
                <md-card-actions>
                  <button md-button>LIKE</button>
                  <button md-button>SHARE</button>
                  <!--<a md-button [href]="shop.link" target="_blank">READ</a>-->
                </md-card-actions>
              </md-card>
            </div>
          </div>
        </div>     
      </md-tab>
      <md-tab label="Map view">
        <md-card>
          <md-card-content>
            <sebm-google-map [styles]="mapStyles"
                             [latitude]="41" 
                             [longitude]="44" [zoom]="10">
              <sebm-google-map-marker *ngFor="let shop of (shopListData$ | async)?.list"
                                      [latitude]="shop.lat" [longitude]="shop.lng">
              </sebm-google-map-marker>
            </sebm-google-map>
          </md-card-content>
        </md-card>
      </md-tab>
    </md-tab-group>
  `,
  styles: [`
    .sebm-google-map-container {
      height: 600px;
    }
    md-card-title {
      display: flex;
      justify-content: center;
    }
    .shop-list {
      overflow: auto;
      height: calc(100vh - 116px);
      height: -webkit-calc(100vh - 116px);
      height: -moz-calc(100vh - 116px);
    }
    @media (max-width: 600px) and (orientation: portrait) {
      .sebm-google-map-container {
        height: 300px;
      }
      .shop-list {
        height: calc(100vh - 108px);
        height: -webkit-calc(100vh - 108px);
        height: -moz-calc(100vh - 108px);
      }
    }
  `]
})
export class ShopsComponent implements OnInit, IShopsComponent {
  @ViewChild(SebmGoogleMap) sebmGoogleMap;
  public mapStyles = mapStyles;
  public shopListData$: Observable<any>;
  private _skip = 0;
  private _limit = 12;
  private _count: number = null;
  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.shopListData$ = store.select(fromRoot.getShopListData);
  }

  ngOnInit(): void {
    const listener = this.shopListData$.subscribe((event) => {
      if (event.count === null) {
        this.store.dispatch(new shopAction.ListAction({ limit: this._limit, skip: this._skip }));
        if (listener) {
          listener.unsubscribe();
        }
      } else {
        this._count = event.count;
      }
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this.store.dispatch(new shopAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  tabSelectChange(): void {
    this.sebmGoogleMap.triggerResize();
  }
}
