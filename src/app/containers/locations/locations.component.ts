import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util/util.service';
import * as fromRoot from '../../store';
import * as locationAction from '../../store/location/location.actions';
import { mapStyles } from '../../../util';
import { MapComponent } from '../../components/map/map.component';
import { ILocation } from '../../models/api';

// TODO: rename
// TODO: rename css class names
export interface ILocationsComponent {
  onScroll(): void,
  onFilterChange(): void,
  onSlideChange(): void,
  onShowPin(pin: ILocation): void
}

@Component({
  selector: 'app-locations',
  template: `
    <div class="colomns is-hidden-mobile">
      <div class="column pm-page-intro">
        <md-icon color="primary">location_searching</md-icon>&nbsp;&nbsp;&nbsp;
        <span class="pm-color-gray pm-font-18">{{'locations_intro' | translate}}</span>
      </div>
    </div>
    <div class="columns is-mobile filters">
      <div class="column is-8 is-8-mobile">
        <div class="pm-filters-row">
          <md-chip-list>
            <md-chip  *ngFor="let category of (locationFilters$ | async)?.categories" (click)="onChipClick(category)"
                      [selected]="activeFilters.categories.indexOf(category.id) !== -1">{{category.name}}</md-chip>
          </md-chip-list>
        </div>
      </div>
      <div class="column is-4 is-4-mobile">
        <md-slide-toggle *ngIf="isMobile" [(ngModel)]="mapView" (change)="onSlideChange()">Map</md-slide-toggle>
      </div>
    </div>
    <div class="columns">
      <div class="column items-container is-6" [hidden]="isMobile && mapView">
        <div class="items pm-background-light-gray" infinite-scroll
             (scrolled)="onScroll()"
             [infiniteScrollDistance]="2"
             [infiniteScrollThrottle]="300"
             [scrollWindow]="false">
          <div class="columns">
            <div class="column">
              <masonry [options]="{ transitionDuration: '0.5s', percentPosition: true }"
                       [useImagesLoaded]="true"
                       class="columns pm-width-100">
                <masonry-brick *ngFor="let location of (locationList$ | async)?.list"
                               class="column is-6-desktop is-6-tablet">
                  <app-location [location]="location" (onShowPin)="onShowPin($event)"></app-location>
                </masonry-brick>
              </masonry>
            </div>
          </div>
          <div *ngIf="(locationList$ | async)?.total > (locationList$ | async)?.list.length"
               class="pm-font-14 pm-color-gray pm-load-more pm-cursor-pointer"
               (click)="onScroll(); $event.stopPropagation()">
            {{'load_more' | translate}} <i class="mdi mdi-dots-horizontal"></i></div>
        </div>
      </div>
      <div class="column is-6 map-container" [hidden]="isMobile && !mapView">
        <app-map [pins]="locationPins$ | async" [fitBounds]="true" [options]="mapOptions"></app-map>
      </div>
    </div>
  `,
  styles: [`
    .filters {
      /*margin-top: 15px !important;*/
      /*margin-left: 15px !important;*/
    }
    md-slide-toggle {
      margin: 0;
    }
    .pm-filters-row {
      display: block;
      overflow: auto;
      white-space: nowrap;
    }
    /deep/ .pm-filters-row  .mat-chip-list-wrapper {
     flex-wrap: nowrap;
    }
    .items {
      overflow: auto;
    }
    app-map, .items {
      height: calc(100vh - 204px);
      height: -webkit-calc(100vh - 204px);
      height: -moz-calc(100vh - 204px);
    }
    md-chip {
      cursor: pointer;
      margin-right: 5px;
    }
    @media (max-width: 600px) and (orientation: portrait) {
      .filters {
        margin-top: 10px !important;
      }
      app-map, .items {
        /* TODO: flexible height */
        height: calc(100vh - 136px);
        height: -webkit-calc(100vh - 136px);
        height: -moz-calc(100vh - 136px);
      }
      .items-container, .map-container {
        padding-top: 0;
      }
    }
  `]
})
export class LocationsComponent implements OnInit, OnDestroy, ILocationsComponent {
  @ViewChild(MapComponent) map;
  public activeFilters = {
    categories: [''],
    type: ''
  };
  public locationFilters$: Observable<any>;
  public locationList$: Observable<any>;
  public locationPins$: Observable<any>;
  public mapOptions = {
    styles: mapStyles,
    clickableIcons: false,
    tilt: 0
  };
  public isMobile = UtilService.getCurrentDevice() !== 'DESKTOP';
  public mapView = false;
  private _skip = 0;
  private _limit = 10;
  private _total: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.locationFilters$ = _store.select(fromRoot.getLocationFilters);
    this.locationList$ = _store.select(fromRoot.getLocationList);
    this.locationPins$ = _store.select(fromRoot.getLocationPins);
  }

  ngOnInit(): void {
    // TODO: clear list and get new one
    this._store.dispatch(new locationAction.FiltersAction({}));
    this._store.dispatch(new locationAction.ListAction({ limit: this._limit, skip: this._skip }));
    this._store.dispatch(new locationAction.PinsAction({}));
    this.locationList$.subscribe($event => {
      this._total = $event.total;
    });
  }

  ngOnDestroy(): void {
    this._store.dispatch(new locationAction.ListClearAction({}));
  }

  onScroll(): void {
    if (this._skip + this._limit < this._total) {
      this._skip += this._limit;
      this._store.dispatch(new locationAction.ListLoadMoreAction({ limit: this._limit, skip: this._skip,
        categories: this.activeFilters.categories }));
    }
  }

  onFilterChange(): void {
    this._skip = 0;
    this._store.dispatch(new locationAction.ListAction({ limit: this._limit, skip: this._skip,
      categories: this.activeFilters.categories }));
    this._store.dispatch(new locationAction.PinsAction({ categories: this.activeFilters.categories }));
  }

  onShowPin(pin: ILocation): void {
    if (this.isMobile) {
      this.mapView = true;
      this.onSlideChange();
      // TODO: find solution without timeouts
      setTimeout(() => {
        this.map.highlightPin(pin);
        this.map.panTo(pin);
        this.map.setZoom(17);
      }, 200);
    } else {
      this.map.highlightPin(pin);
      this.map.panTo(pin);
      this.map.setZoom(17);
    }
  }

  onSlideChange(): void {
    // TODO: find solution without timeouts
    this.map.setIconToAllActivePins();
    setTimeout(() => this.map.triggerResize());
    setTimeout(() => this.map.fitBoundsMap(), 100);
  }

  onChipClick(category: {name: string, id: string}): void {
    if (category.id) {
      this.activeFilters.categories = this.activeFilters.categories.filter(c => c !== '');
      const index = this.activeFilters.categories.indexOf(category.id);
      if (index === -1) {
        this.activeFilters.categories.push(category.id);
      } else {
        this.activeFilters.categories.splice(index, 1);
      }
    } else {
      this.activeFilters.categories = [''];
    }

    this._skip = 0;
    this._store.dispatch(new locationAction.ListAction({ limit: this._limit, skip: this._skip,
      categories: this.activeFilters.categories }));
    this._store.dispatch(new locationAction.PinsAction({ categories: this.activeFilters.categories }));
  }
}
