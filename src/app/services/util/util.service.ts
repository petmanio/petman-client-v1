import { Injectable, Component, Compiler, NgModule, Input, ComponentFactory } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { LatLngBounds, LatLng, MapsAPILoader } from 'angular2-google-maps/core';
import { environment } from '../../../environments/environment'
declare var google: any;

export interface IUtilService {
  getLatLngBound(coordinates: Coordinates[]): Subject<any[]>
}

@Injectable()
export class UtilService implements IUtilService {
  static initScripts() {
    (<any>window).fbAsyncInit = () => {
      FB.init({
        appId : environment.fb.appId,
        xfbml : true,
        version : 'v2.8'
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  static XHRListener(): Observable<boolean> {
    const subject = new ReplaySubject(1);
    const proxied = window['XMLHttpRequest'].prototype.send;
    window['XMLHttpRequest'].prototype.send = function() {
      subject.next(true);
      const pointer = this;
      const intervalId = setInterval(() => {
        if (pointer.readyState !== 4) {
          return;
        }
        subject.next(false);
        clearInterval(intervalId);

      }, 1);
      return proxied.apply(this, [].slice.call(arguments));
    };

    return subject;
  }

  static getCurrentDevice(): 'MOBILE' | 'TABLET' | 'DESKTOP' {
    let type;
    if (window.matchMedia('(max-width: 480px)').matches) {
      type = 'MOBILE';
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      type = 'TABLET';
    } else {
      type = 'DESKTOP';
    }

    return type;
  }

  constructor(private _mapsAPILoader: MapsAPILoader) {}

  getLatLngBound(coordinates: Coordinates[]): Subject<any> {
    const boundsSubject: Subject<any> = new Subject();
    this._mapsAPILoader.load().then(() => {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      for (const coordinate of coordinates) {
        const point: LatLng = new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
        bounds.extend(point);
      }
      boundsSubject.next(bounds);
    });

    return boundsSubject;
  }
}
