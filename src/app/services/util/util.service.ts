import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SailsService } from 'angular2-sails';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
import { pick } from 'lodash';
import * as fromRoot from '../../store';
import * as moment from 'moment';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MdIconRegistry } from '@angular/material';
import { IReview } from '../../models/api';

export interface IUtilService {
  initSocket(): void,
  playNotificationSound(): void,
  updateMeta(): void,
  registerNewIcons(): void
}

@Injectable()
export class UtilService implements IUtilService {
  private _notificationSound = new Audio('/assets/trembling.mp3');

  static initScripts() {
    (<any>window).fbAsyncInit = () => {
      FB.init({
        appId : environment.fb.appId,
        xfbml : true,
        version : 'v2.9'
      });
      // FB.AppEvents.logPageView();
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {} else if (response.status === 'not_authorized') {} else {}
      });
    };

    (function(d, s, id){
      //noinspection TsLint
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    if (environment.gaId) {
      const currdate: any = new Date();
      const gaNewElem: any = {};
      const gaElems: any = {};

      (function(i: any, s, o, g, r, a, m){i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function(){
          (i[r].q = i[r].q || []).push(arguments)}, i[r].l = 1 * currdate; a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga', gaNewElem, gaElems);

      ga('create', environment.gaId, 'auto');
      ga('send', 'pageview');
    }
  }

  static XHRListener(): Observable<boolean> {
    const subject = new ReplaySubject(1);
    const proxied = window['XMLHttpRequest'].prototype.send;
    window['XMLHttpRequest'].prototype.send = function() {
      subject.next(true);
      const pointer = this;
      const intervalId = setInterval(() => {
          if (pointer.readyState !== 4) {
          // if (pointer.readyState === 1) {
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

  static formatDate(date, format = 'll'): string {
    return moment(date).format(format);
  }

  static countAverage(list: any[], key = 'rating'): number {
    return list.reduce((sum, el, i, array) => {
      sum += el[key];
      return i === array.length - 1 ? (array.length === 0 ? 0 : sum / array.length) : sum
    }, 0);
  }

  static convertApplicationsListToReviews(applications): IReview[] {
    // TODO: use <T>
    return applications.map(application => {
      application = pick(application, ['rating', 'review', 'consumer', 'createdAt', 'updatedAt']);
      application.user = application.consumer;
      delete application.consumer;
      return application;
    });
  }

  constructor(private _sailsService: SailsService,
              private _store: Store<fromRoot.State>,
              private _meta: Meta,
              private _translate: TranslateService,
              private _mdIconRegistry: MdIconRegistry,
              private _sanitizer: DomSanitizer) {}

  playNotificationSound(): void {
    this._notificationSound.play();
  }

  initSocket(): void {
    window['io'].sails.reconnection = true;
    window['io'].sails.useCORSRouteToGetCookie = false;
    window['io'].sails.environment = environment.production ? 'production' : 'development';

    const connect = () => {
      // TODO: why opts not working
      const opts = {
        url: environment.apiEndpoint,
        transports: ['polling', 'websocket'],
        headers: {'x-auth-token': localStorage.getItem('token')},
        autoConnect: false,
        environment: environment.production ? 'production' : 'development'
      };
      this._sailsService.connect(opts)
        .subscribe(() => {
          this._sailsService.on('roomApplicationMessage')
            .subscribe($event => {
              if ($event) {
                // this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction($event));
              }
            });
        });
    };

    connect();
  }

  updateMeta(): void {
    this._meta.updateTag({ property: '', content: '' });
  }

  registerNewIcons(): void {
    this._mdIconRegistry.addSvgIcon('pet_health',  this._sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/stethoscope.svg'));
  }
}
