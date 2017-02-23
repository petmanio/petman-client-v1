import { Injectable, Component, Compiler, NgModule, Input, ComponentFactory } from '@angular/core';
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
}
