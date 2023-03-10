import { AfterViewChecked, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../services/util/util.service';
import * as lodash from 'lodash';
import { IPin } from '../../models/api';
import { markerClustererOptions } from '../../../util';

const GoogleMapsLoader = require('google-maps');
const MarkerClusterer = require('node-js-marker-clusterer');
// TODO: use map style from map component
GoogleMapsLoader.KEY = environment.mapApiKey;

export interface IMapComponent {
  triggerResize(): void,
  createMarker(pin: any): void
  createMarkers(pins: any): void,
  clearMap(): void,
  highlightPin(pin: any): void,
  panTo(pin: any): void,
  setZoom(level): void,
  fitBoundsMap(): void,
  setIconToAllActivePins(icon: string): void,
  addInfoWindowListener(marker: any): void,
  deleteMarkers(): void
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
    }
  };
  @Input() pins: IPin[] = [];
  @Input() fitBounds = true;
  @Input() infoWindow = true;
  @Input() showUserLocation = true;
  public google: any;
  public map: any;
  public markers: any;
  public latlngbounds: any;
  public userMarker: any = null;
  public mapId: string = UtilService.randomHtmlId();
  public el: Element;
  private _pinIcon = '/assets/pin.png';
  private _pinIconActive = '/assets/pin-active.png';
  private _pinIconUser = '/assets/pin-user.png';
  private _activePins: any[] = [];
  private _markerMoveInterVal = 1000;
  private _infoWindowMaxWidth = 200;
  private _markerClusterer: any;
  constructor(private _utilService: UtilService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el = document.getElementById(this.mapId);
    if (this.el) {
      GoogleMapsLoader.load((google) => {
        this.google = google;
        const fitBoundsMapDebounce = lodash.debounce(this.fitBoundsMap.bind(this), 300);
        if (!this.map) {
          this.map = new google.maps.Map(this.el, this.options);
        } else {
          this.deleteMarkers();
        }

        if (this.fitBounds) {
          this.latlngbounds = new google.maps.LatLngBounds();
          if (this.userMarker) {
            this.latlngbounds.extend(this.userMarker.getPosition());
          }
        }

        // if (this.showUserLocation && navigator.geolocation && !this.userMarker) {
        //   navigator.geolocation.getCurrentPosition((navigatorPosition) => {
        //     const position = new this.google.maps.LatLng(navigatorPosition.coords.latitude, navigatorPosition.coords.longitude);
        //     const pinMarkerOptions = {
        //       position,
        //       map: this.map,
        //       icon: {
        //         url: this._pinIconUser,
        //         scaledSize : new google.maps.Size(32, 32),
        //       }
        //     };
        //
        //     this.userMarker = new this.google.maps.Marker(pinMarkerOptions);
        //     if (this.latlngbounds) {
        //       this.latlngbounds.extend(position);
        //     }
        //
        //     if (this.fitBounds) {
        //       setTimeout(() => {
        //         fitBoundsMapDebounce();
        //         this.triggerResize();
        //       }, 100);
        //     }
        //   }, () => {}, {enableHighAccuracy: true})
        // }

        fitBoundsMapDebounce();
        this.createMarkers(this.pins);
        this.triggerResize();
        this._markerClusterer = new MarkerClusterer(this.map, this.markers, markerClustererOptions);
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

  createMarkers(pins: any): void {
    this.markers = this.pins.map((pin) => this.createMarker(pin));
  }

  createMarker(pin: any): void {
    const position = new this.google.maps.LatLng(pin.lat, pin.lng);
    const pinMarkerOptions = {
      position,
      // map: this.map,
      icon: {
        url: this._pinIcon,
        scaledSize : new google.maps.Size(32, 32),
      },
      pin
    };

    const marker = new this.google.maps.Marker(pinMarkerOptions);

    if (this.latlngbounds) {
      this.latlngbounds.extend(position);
    }

    if (this.infoWindow) {
      this.addInfoWindowListener(marker);
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

  highlightPin(pin: any): void {
    const activePin = this.markers.find(m => m.pin.id === pin.id);
    if (activePin) {
      const index = this._activePins.indexOf(activePin);
      if (index === -1) {
        activePin.setIcon({
          url: this._pinIconActive,
          scaledSize : new google.maps.Size(32, 32),
        });
        activePin.openInfoWindow();
        this.setIconToAllActivePins();
        this._activePins.push(activePin);
      } else {
        this._activePins.splice(index, 1);
        activePin.setIcon({
          url: this._pinIcon,
          scaledSize : new google.maps.Size(32, 32),
        });
        activePin.closeInfoWindow();
        setTimeout(() => this.fitBoundsMap());
      }
    }
  }

  panTo(pin: any): void {
    const activePin = this.markers.find(m => m.pin.id === pin.id);
    if (activePin) {
      this.map.panTo(activePin.getPosition());
    }
  }

  setZoom(level): void {
    this.map.setZoom(level);
  }

  fitBoundsMap(): void {
    if (this.fitBounds) {
      this.map.fitBounds(this.latlngbounds);
    }
  }

  setIconToAllActivePins(icon = this._pinIcon): void {
    while (this._activePins.length) {
      const marker = this._activePins.pop();
      marker.setIcon({
        url: icon,
        scaledSize : new google.maps.Size(32, 32),
      });
      marker.closeInfoWindow();
    }
  }

  addInfoWindowListener(marker: any): void {
    const infoWindow = new google.maps.InfoWindow({
      content: `<div>${marker.pin.name}</div><div>${marker.pin.description}</div>`,
      maxWidth: this._infoWindowMaxWidth
    });

    marker.openInfoWindow = () => {
      marker._infoWindow = true;
      infoWindow.open(this.map, marker);
    };
    marker.closeInfoWindow = () => {
      marker._infoWindow = false;
      infoWindow.close(this.map, marker);
    };

    marker.addListener('click', () => {
      if (marker._infoWindow) {
        marker.closeInfoWindow();
      } else {
        marker.openInfoWindow();
      }
    });
  }

  deleteMarkers(): void {
    if (this.markers) {
      this.markers.forEach(m => m.setMap(null));
    }
    if (this._markerClusterer) {
      this._markerClusterer.clearMarkers();
    }
    // if (this.userMarker) {
    //   this.userMarker.setMap(null);
    // }
    this._activePins = [];

  }
}
