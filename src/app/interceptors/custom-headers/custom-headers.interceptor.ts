import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      headers: req.headers
        // .set('Content-Type',
        //   typeof req.headers.get('Content-Type') === 'undefined' ? 'application/json' : req.headers.get('Content-Type'))
        .set('x-auth-token', localStorage.getItem('token') || '')
        .set('x-selected-user', localStorage.getItem('selectedUserId') || '')
    });
    return next.handle(req);
  }
}

