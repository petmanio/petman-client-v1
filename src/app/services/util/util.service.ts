import { Injectable, Component, Compiler, NgModule, Input, ComponentFactory } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment'

export interface IUtilService {

}

@Injectable()
export class UtilService implements IUtilService {
  constructor() {}
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
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  static XHRListener(): Observable<boolean> {
    const subject = new ReplaySubject(1);
    const proxied = window['XMLHttpRequest'].prototype.send;
    window['XMLHttpRequest'].prototype.send = function() {
      subject.next(true);
      let pointer = this;
      let intervalId = setInterval(() => {
        if(pointer.readyState !== 4) {
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
    if (window.matchMedia("(max-width: 480px)").matches) {
      type = 'MOBILE';
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      type = 'TABLET';
    } else {
      type = 'DESKTOP';
    }

    return type;
  }
}
