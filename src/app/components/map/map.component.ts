import { Component, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';
const GoogleMapsLoader = require('google-maps');
import { environment } from '../../../environments/environment';
import { UtilService } from '../../services/util/util.service';
GoogleMapsLoader.KEY = environment.mapApiKey;

export interface IMapComponent {
  triggerResize(): void,
  addMarker(pin: any): void
  addMarkers(pins: any): void,
  clearMap(): void,
}

@Component({
  selector: 'app-map',
  template: `
    <div class="map" id="{{mapId}}"></div>
  `,
  styles: [`
    .map {
      height: 100%;
    }
    :host { 
      display: block;
    }
  `]
})
export class MapComponent implements AfterViewChecked, OnChanges, IMapComponent {
  @Input() options: any = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
  };
  @Input() pins: {
    lat: number,
    lng: number
  }[] = [];
  @Input() fitBounds = true;
  public google: any;
  public map: any;
  public markers: any;
  public latlngbounds: any;
  public mapId: string = UtilService.randomHtmlId();
  public el: Element;
  private _initialized = false;
  constructor(private _utilService: UtilService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el = document.getElementById(this.mapId);
    if (this.el) {
      GoogleMapsLoader.load((google) => {
        this.google = google;
        this.map = new google.maps.Map(this.el, this.options);
        if (this.fitBounds) {
          this.latlngbounds = new google.maps.LatLngBounds();
        }

        this.addMarkers(this.pins);
        this.triggerResize();
        if (this.fitBounds) {
          this.map.fitBounds(this.latlngbounds);
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    // this.el = document.getElementById(this.mapId);
    // if (this.el) {
    //   // TODO: fix this hack
    //   if (this._initialized) {
    //     return;
    //   }
    //   GoogleMapsLoader.load((google) => {
    //     this._initialized = true;
    //     this.google = google;
    //     this.map = new google.maps.Map(this.el, this.options);
    //     if (this.fitBounds) {
    //       this.latlngbounds = new google.maps.LatLngBounds();
    //     }
    //     this.addMarkers(this.pins);
    //     this.triggerResize();
    //     if (this.fitBounds) {
    //       this.map.fitBounds(this.latlngbounds);
    //     }
    //   });
    // }
  }

  addMarkers(pins: any): void {
    this.markers = this.pins.map((pin) => this.addMarker(pin));
  }

  addMarker(pin: any): void {
    const position = new this.google.maps.LatLng(pin.lat, pin.lng);
    const pinMarkerOptions = {
      position,
      map: this.map
    };

    const marker = new this.google.maps.Marker(pinMarkerOptions);

    if (this.latlngbounds) {
      this.latlngbounds.extend(position);
    }

    return marker;
  }

  triggerResize(): void {
    if (this.map) {
      this.google.maps.event.trigger(this.map, 'resize');
    }
  }

  clearMap(): void {
    if (this.markers) {
      while (this.markers.length) {
        this.markers.pop().setMap(null);
      }
    }
  }
}
