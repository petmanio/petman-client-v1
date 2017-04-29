import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SailsService } from 'angular2-sails';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as roomAction from '../../store/room/room.actions';
import { setInterval } from 'timers';

export interface IUtilService {
  initSocket(): void
  // getLatLngBound(coordinates: Coordinates[]): Subject<any[]>
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

    (function(d, s, id) {
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
          // if (pointer.readyState !== 4) {
          if (pointer.readyState === 1) {
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

  static uuid(): string {
    return Math.random().toString(36).substring(7);
  }

  static randomHtmlId(len: number = 5): string {
    let text = '';
    const possible = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for ( let i = 0; i < len; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  static capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();

  constructor(private _sailsService: SailsService, private _store: Store<fromRoot.State>) {}

  initSocket(): void {
    const connect = () => {
      this._sailsService.connect(environment.apiEndpoint)
        .subscribe(() => {
          this._sailsService.on('roomApplicationMessage')
            .subscribe($event => {
              this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction($event));
            });
        });
    };

    connect();

  }

  // getLatLngBound(coordinates: Coordinates[]): Subject<any> {
  //   const boundsSubject: Subject<any> = new Subject();
  //   this._mapsAPILoader.load().then(() => {
  //     const bounds: LatLngBounds = new google.maps.LatLngBounds();
  //     for (const coordinate of coordinates) {
  //       const point: LatLng = new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
  //       bounds.extend(point);
  //     }
  //     boundsSubject.next(bounds);
  //   });
  //
  //   return boundsSubject;
  // }
}
