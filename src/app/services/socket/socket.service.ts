import { Injectable } from '@angular/core';
import * as socketIOClient from 'socket.io-client';
import * as sailsIOClient from 'sails.io.js';
import { extend } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';
import * as roomAction from '../../store/room/room.actions';

export interface ISocketConnectOptions {
  reconnection?: boolean,
  rejectUnauthorized?: boolean,
  headers?: {[name: string]: string},
  transports?: string[],
  environment?: string
}

export interface ISocketService {
  connect(url: string, options: ISocketConnectOptions): void,
  on(event: string): Observable<any>,
  post(url: string, data: any): Observable<any>,
  get(url: string, data: any): Observable<any>,
  put(url: string, data: any): Observable<any>,
  listenRoomApplicationMessage(): void
}

@Injectable()
export class SocketService implements ISocketService {
  io: any;
  constructor(private _store: Store<fromRoot.State>) {
    this.io = sailsIOClient(socketIOClient);
    this.io.sails.autoConnect = false;
  }

  connect(url: string, options: ISocketConnectOptions = {}): Observable<any> {
    console.log(1, this.io.socket)
    const subject = new Subject();
    this.io.sails = extend(this.io.sails, options);
    this.io.sails.connect(url);
    console.log(this.io.socket)
    this.io.socket.on('connect', () => subject.next());
    return subject;
  }

  on(event: string): Observable<any> {
    const subject = new Subject();
    this.io.sails.on(event, res => subject.next(res));
    return subject;
  }

  post(url: string, data: any): Observable<any> {
    const subject = new Subject();
    this.io.sails.post(url, data, res => subject.next(data));
    return subject;
  }

  get(url: string, data: any): Observable<any> {
    console.log(1, this.io.socket)
    const subject = new Subject();
    console.log(this.io)
    // this.io.socket.get(url, data, res => subject.next(data));
    return subject;
  }

  put(url: string, data: any): Observable<any> {
    const subject = new Subject();
    this.io.sails.put(url, data, res => subject.next(data));
    return subject;
  }

  listenRoomApplicationMessage(): void {
    this.on('roomApplicationMessage')
      .subscribe($event => {
        if ($event) {
          this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction($event));
        }
      });
  }
}


// window['io'].sails.reconnection = true;
// window['io'].sails.useCORSRouteToGetCookie = false;
// window['io'].sails.environment = environment.production ? 'production' : 'development';
// window['io'].sails.rejectUnauthorized = false;

// const connect = () => {
//   // TODO: why opts not working
//   const opts = {
//     url: environment.apiEndpoint,
//     // transports: ['polling', 'websocket'],
//     // headers: {'x-auth-token': localStorage.getItem('token')},
//     autoConnect: false,
//     environment: environment.production ? 'production' : 'development'
//   };
//   this._sailsService.connect(opts)
//     .subscribe(() => {
//       this._sailsService.on('roomApplicationMessage')
//         .subscribe($event => {
//           if ($event) {
//             this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction($event));
//           }
//         });
//     });
// };
//
// connect();
