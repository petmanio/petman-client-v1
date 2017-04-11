import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UtilService, PetCareFilterEnum } from '../../services/util/util.service';
import * as fromRoot from '../../store';
import * as petCareAction from '../../store/petCare/petCare.actions';
import { mapStyles } from '../../../util';
import { MapComponent } from '../map/map.component';
import { IPetCare } from '../../models/api';

export interface IPetCareComponent {
  onScroll(): void,
  onFilterChange(): void,
  onSlideChange(): void,
  onShowPin(pin: IPetCare): void
}

@Component({
  selector: 'app-pet-care',
  template: `
    <div class="columns is-mobile filters">
      <div class="column is-8 is-8-mobile">
        <md-chip-list>
          <!--<md-chip (click)="onChipClick({id: ''})" [selected]="activeFilters.categories.indexOf('') !== -1">All</md-chip>-->
          <md-chip  *ngFor="let category of (petCareFilters$ | async)?.categories" (click)="onChipClick(category)" 
                    [selected]="activeFilters.categories.indexOf(category.id) !== -1">{{category.name}}</md-chip>
        </md-chip-list>
        <!--<md-select placeholder="Type" [(ngModel)]="activeFilters.type" (change)="onFilterChange()">-->
          <!--<md-option *ngFor="let type of filters.types" [value]="type.id">{{ type.name }}</md-option>-->
        <!--</md-select>-->
      </div>
      <div class="column is-4 is-4-mobile">
        <md-slide-toggle *ngIf="isMobile" [(ngModel)]="mapView" (change)="onSlideChange()">Map</md-slide-toggle>
      </div>
    </div>
    <div class="columns">
      <div class="column items-container is-6" [hidden]="isMobile && mapView">
        <div class="items" infinite-scroll
             (scrolled)="onScroll()"
             [infiniteScrollDistance]="2"
             [infiniteScrollThrottle]="300"
             [scrollWindow]="false">
          <div class="columns" *ngFor="let petCareRow of (petCareList$ | async)?.list | chunk:3">
            <div class="column" *ngFor="let petCare of petCareRow">
              <app-pet-care-item [petCare]="petCare" (onShowPin)="onShowPin($event)"></app-pet-care-item>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6 map-container" [hidden]="isMobile && !mapView">
        <app-map [pins]="petCarePins$ | async" [fitBounds]="true" [options]="mapOptions"></app-map>
      </div>
    </div>
  `,
  styles: [`
    .filters {
      margin-top: 30px !important;
      margin-left: 15px !important;
    }
    md-slide-toggle {
      margin: 0;
    }
    md-chip-list {
      display: block;
      overflow: auto;
      white-space: nowrap;
    }
    /*TODO: find right way*/
    .column {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box;    /* Firefox, other Gecko */
      box-sizing: border-box;
    }
    .items {
      overflow: auto;
    }
    app-map, .items {
      height: calc(100vh - 176px);
      height: -webkit-calc(100vh - 176px);
      height: -moz-calc(100vh - 176px);
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
        height: calc(100vh - 140px);
        height: -webkit-calc(100vh - 140px);
        height: -moz-calc(100vh - 140px);
      }
      .items-container, .map-container {
        padding-top: 0;
      }
    }
  `]
})
export class PetCareComponent implements OnInit, IPetCareComponent {
  @ViewChild(MapComponent) map;
  public activeFilters = {
    categories: [''],
    type: ''
  };
  public petCareFilters$: Observable<any>;
  public petCareList$: Observable<any>;
  public petCarePins$: Observable<any>;
  public mapOptions = {
    styles: mapStyles,
    clickableIcons: false,
    tilt: 0
  };
  public isMobile = UtilService.getCurrentDevice() === 'MOBILE';
  public mapView = false;
  private _skip = 0;
  private _limit = 9;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _utilService: UtilService) {
    this.petCareFilters$ = _store.select(fromRoot.getPetCareFilters);
    this.petCareList$ = _store.select(fromRoot.getPetCareList);
    this.petCarePins$ = _store.select(fromRoot.getPetCarePins);
  }

  ngOnInit(): void {
    this._store.dispatch(new petCareAction.FiltersAction({}));
    const listListener = this.petCareList$.subscribe((event) => {
      if (event.count === null) {
        this._store.dispatch(new petCareAction.ListAction({ limit: this._limit, skip: this._skip }));
        if (listListener) {
          listListener.unsubscribe();
        }
      } else {
        this._count = event.count;
      }
    });

    const pinsListener = this.petCarePins$.subscribe((event) => {
      this._store.dispatch(new petCareAction.PinsAction({}));
      if (pinsListener) {
        pinsListener.unsubscribe();
      }
    });
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new petCareAction.ListAction({ limit: this._limit, skip: this._skip,
        categories: this.activeFilters.categories }));
    }
  }

  onFilterChange(): void {
    this._skip = 0;
    this._store.dispatch(new petCareAction.ListClearAction({}));
    this._store.dispatch(new petCareAction.ListAction({ limit: this._limit, skip: this._skip, categories: this.activeFilters.categories }));
    this._store.dispatch(new petCareAction.PinsAction({ categories: this.activeFilters.categories }));
  }

  onShowPin(pin: IPetCare): void {
    if (this.isMobile) {
      this.mapView = true;
      this.onSlideChange();
      // TODO: find solution without timeouts
      setTimeout(() => {
        this.map.highlightPin(pin);
        this.map.panTo(pin);
      }, 200);
    } else {
      this.map.highlightPin(pin);
      this.map.panTo(pin);
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
    this._store.dispatch(new petCareAction.ListClearAction({}));
    this._store.dispatch(new petCareAction.ListAction({ limit: this._limit, skip: this._skip, categories: this.activeFilters.categories }));
    this._store.dispatch(new petCareAction.PinsAction({ categories: this.activeFilters.categories }));
  }
}
