import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util/util.service';
import * as fromRoot from '../../store';
import * as shopAction from '../../store/shop/shop.actions';
import { mapStyles } from '../../../util';
import { MapComponent } from '../map/map.component';

export interface IShopsComponent {
  tabSelectChange(): void,
  onScroll(): void
}

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
              <app-shop-item [shop]="shop"></app-shop-item>
            </div>
          </div>
        </div>     
      </md-tab>
      <md-tab label="Map view">
        <md-card>
          <md-card-content>
            <app-map [pins]="shopPins$ | async" [fitBounds]="true" [options]="mapOptions"></app-map>
          </md-card-content>
        </md-card>
      </md-tab>
    </md-tab-group>
  `,
  styles: [`
    app-map {
      display: block;
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
      app-map {
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
  @ViewChild(MapComponent) map;
  public mapStyles = mapStyles;
  public shopList$: Observable<any>;
  public shopPins$: Observable<any>;
  public mapOptions = {
    // styles: mapStyles,
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
  };
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
    this.map.triggerResize();
  }
}
