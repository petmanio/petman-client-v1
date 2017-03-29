import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as shopAction from '../../store/shop/shop.actions';
import { mapStyles } from '../../../util';
import { SebmGoogleMap, LatLngBounds } from 'angular2-google-maps/core';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';

export interface IShopsComponent {}

@Component({
  selector: 'app-shops',
  template: `
    <md-tab-group (selectChange)="tabSelectChange()">
      <md-tab label="List view">
        <div class="shop-list" infinite-scroll
             (scrolled)="onScroll()"
             [infiniteScrollDistance]="2"
             [infiniteScrollThrottle]="300"
             [scrollWindow]="false">
          <div class="columns" *ngFor="let shopRow of (shopList$ | async)?.list | chunk:4">
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
                             [fitBounds]="mapFitBounds">
              <sebm-google-map-marker *ngFor="let pin of shopPins$ | async"
                                      [latitude]="pin.lat" [longitude]="pin.lng"></sebm-google-map-marker>
            </sebm-google-map>
          </md-card-content>
        </md-card>
      </md-tab>
    </md-tab-group>
  `,
  styles: [`
    .sebm-google-map-container {
      height: calc(100vh - 162px);
      height: -webkit-calc(100vh - 162px);
      height: -moz-calc(100vh - 162px);
    }
    md-card-title {
      display: flex;
      justify-content: center;
    }
    .shop-list {
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100vh - 116px);
      height: -webkit-calc(100vh - 116px);
      height: -moz-calc(100vh - 116px);
    }
    @media (max-width: 600px) and (orientation: portrait) {
      .sebm-google-map-container {
        height: calc(100vh - 168px);
        height: -webkit-calc(100vh - 168px);
        height: -moz-calc(100vh - 168px);
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
  public shopList$: Observable<any>;
  public shopPins$: Observable<any>;
  public mapFitBounds: LatLngBounds;
  private _skip = 0;
  private _limit = 12;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.shopList$ = _store.select(fromRoot.getShopList);
    this.shopPins$ = _store.select(fromRoot.getShopPins);
  }

  ngOnInit(): void {
    const listListener = this.shopList$.subscribe((event) => {
      if (event.count === null) {
        this._store.dispatch(new shopAction.ListAction({ limit: this._limit, skip: this._skip }));
        if (listListener) {
          listListener.unsubscribe();
        }
      } else {
        this._count = event.count;
      }
    });

    const pinsListener = this.shopPins$.subscribe((event) => {
      this._utilService.getLatLngBound(event.map(shop => { return { latitude: shop.lat, longitude: shop.lng } }))
        .subscribe(bounds => this.mapFitBounds = bounds);
      this._store.dispatch(new shopAction.PinsAction({}));
      if (pinsListener) {
        pinsListener.unsubscribe();
      }
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new shopAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  tabSelectChange(): void {
    this.sebmGoogleMap.triggerResize();
    setTimeout(() => this.sebmGoogleMap._fitBounds(this.mapFitBounds));
  }
}
