import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find } from 'lodash';
import { UtilService } from '../../services/util/util.service';

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import * as authAction from '../../store/auth/auth.actions';
import { INotification, IUser } from '../../models/api';
import { SailsService } from 'angular2-sails';
import { environment } from '../../../environments/environment';
import * as roomAction from '../../store/room/room.actions';
import * as messageAction from '../../store/message/message.actions';
import * as walkerAction from '../../store/walker/walker.actions';
import * as adoptAction from '../../store/adopt/adopt.actions';
import * as lostFoundAction from '../../store/lostFound/lostFound.actions';
import * as notificationAction from '../../store/notification/notification.actions';
import { TranslateService } from '@ngx-translate/core';

export interface IAppComponent {
  closeSidenav(): void,
  toggleSidenav($event: Event): void,
  onScroll(): void,
  onNotificationMenuOpen(): void,
  onNotificationClick(notification: INotification): void
  logOut(): void,
  initSocket(): void,
  onJoinClick(): void,
  onLanguageChange($event): void,
  onSelectedUserChange($event): void
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  selectedUser$: Observable<IUser>;
  currentUser$: Observable<IUser>;
  notifications$: Observable<any>;
  currentUser: IUser;
  notifications: INotification[];
  toolbarRightButtons: string[] = [];
  sideNavMode = 'side';
  showSpinner = true;
  currentSideNavState: boolean;
  // TODO: improve notification status system
  unseenNotificationsCount = 0;
  // TODO: read from store
  xhrListener: Observable<boolean> = UtilService.XHRListener();
  lang: string;
  private _skip = 0;
  private _limit = 10;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _ref: ChangeDetectorRef,
              private _zone: NgZone,
              private _utilsService: UtilService,
              private _sailsService: SailsService,
              private _translate: TranslateService) {
    UtilService.initScripts();
    this.showSidenav$ = this._store.select(fromRoot.getShowSidenav);
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
    this.notifications$ = this._store.select(fromRoot.getNotificationList);
    this._translate.setDefaultLang('en');
    this._utilsService.registerNewIcons();
  }

  ngOnInit(): void {
    // TODO: find better way
    setTimeout(() => {
      const el = document.getElementById('page-loader');
      el.parentElement.removeChild(el);
    }, 500);
    let notificationListReceived;
    this.currentUser$.subscribe(($event) => {
      this.currentUser = $event;
      // TODO: merge if checks into one
      if (this.currentUser && !notificationListReceived) {
        this._store.dispatch(new notificationAction.ListAction({skip: this._skip, limit: this._limit}));
        notificationListReceived = true;
      } else if (!this.currentUser) {
        this._store.dispatch(new notificationAction.ListClearAction({}));
        notificationListReceived = false;
      }

      if (this.currentUser) {
        let selectedUserId = localStorage.getItem('selectedUserId');
        if (selectedUserId && selectedUserId !== this.currentUser.id.toString()) {
          if (!find(this.currentUser.internalUsers, {id: parseInt(selectedUserId, 0)})) {
            localStorage.removeItem('selectedUserId');
          }
        } else {
          selectedUserId = this.currentUser.id.toString()
        }
        this._store.dispatch(new authAction.ChangeCurrentUserAction(parseInt(selectedUserId, 0)));
        localStorage.setItem('selectedUserId', selectedUserId);
      }
    });

    if (UtilService.getCurrentDevice() === 'DESKTOP') {
      this._store.dispatch(new layout.OpenSidenavAction());
    } else {
      this._store.dispatch(new layout.CloseSidenavAction());
    }

    // FIXME: find better way
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
      } else if (event instanceof NavigationEnd) {
        if (UtilService.getCurrentDevice() !== 'DESKTOP') {
          this._store.dispatch(new layout.CloseSidenavAction());
        }
        // const showSidenav = UtilService.getRouteDataByKey(this._activatedRoute, 'showSidenav');
        // if (typeof showSidenav !== 'undefined') {
        //   if (showSidenav && UtilService.getCurrentDevice() === 'DESKTOP') {
        //     this._store.dispatch(new layout.OpenSidenavAction());
        //   } else {
        //     this._store.dispatch(new layout.CloseSidenavAction());
        //   }
        // }
      }
    });

    this.notifications$.subscribe($event => {
      this._count = $event.count;
      this.notifications = $event.list;
      this.unseenNotificationsCount = $event.list.filter((n) => !n.seen).length;
    });

    this.initSocket();

    // TODO: fix on tablet view
    if (UtilService.getCurrentDevice() === 'MOBILE') {
      this.sideNavMode = 'push';
    }

    this.showSidenav$.subscribe((event) => {
      this.currentSideNavState = event;
      // TODO: IE support
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    });

    this._store.dispatch(new authAction.GetCurrentUserAction({}));

    // TODO: use action
    this.lang = localStorage.getItem('lang') || 'am';
    localStorage.setItem('lang', this.lang);
    this._translate.use(this.lang);
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new notificationAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onNotificationMenuOpen(): void {
    const notifications = this.notifications.filter(n => !n.seen).map(n => n.id);
    if (notifications.length) {
      this._store.dispatch(new notificationAction.SeenAction({ notifications }));
    }
  };

  onLanguageChange($event): void {
    this._translate.use(this.lang);
    localStorage.setItem('lang', this.lang);
  }

  onSelectedUserChange($event): void {
    this._store.dispatch(new authAction.ChangeCurrentUserAction($event.value));
  }

  onNotificationClick(notification: INotification): void {
    if (notification.roomApplicationCreate || notification.roomApplicationRate || notification.roomApplicationStatusUpdate) {
      const id = (notification.roomApplicationCreate
      || notification.roomApplicationRate
      || notification.roomApplicationStatusUpdate)['room'];
      this._router.navigate(['rooms', id, 'details'])
    } else if (notification.walkerApplicationCreate || notification.walkerApplicationRate || notification.walkerApplicationStatusUpdate) {
      const id = (notification.walkerApplicationCreate
        || notification.walkerApplicationRate
        || notification.walkerApplicationStatusUpdate)['walker'];
      this._router.navigate(['walkers', id, 'details'])
    } else if (notification.adoptCommentCreate) {
      const id = notification.adoptCommentCreate['adopt'];
      this._router.navigate(['adopt', id, 'details'])
    } else if (notification.lostFoundCommentCreate) {
      const id = notification.lostFoundCommentCreate['lostFound'];
      this._router.navigate(['lost-found', id, 'details'])
    } else if (notification.messageCreate) {
      const id = notification.from['id'];
      this._router.navigate(['messages', id])
    }
  }

  closeSidenav(): void {
    this._store.dispatch(new layout.CloseSidenavAction());
  }

  toggleSidenav($event: Event): void {
    $event.stopPropagation();
    if (this.currentSideNavState) {
      this._store.dispatch(new layout.CloseSidenavAction());
    } else {
      this._store.dispatch(new layout.OpenSidenavAction());
    }
  }

  logOut(): void {
    // this._store.dispatch(new auth.LogoutAction());
    // TODO: use complete action
    // TODO: use dispatch
    // TODO: clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedUserId');
    location.reload();
  }

  initSocket(): void {
    // TODO: use sails service for configuration
    window['io'].sails.reconnection = true;
    window['io'].sails.useCORSRouteToGetCookie = false;
    window['io'].sails.environment = environment.production ? 'production' : 'development';
    let socketConnection;

    const opts = {
      url: environment.apiEndpoint,
      transports: ['polling', 'websocket'],
      headers: {'x-auth-token': localStorage.getItem('token')},
      autoConnect: false,
      environment: environment.production ? 'production' : 'development'
    };
    this._sailsService.connect(opts).subscribe(connection => socketConnection = connection);

    // TODO: reload data after socket connect
    // Message Events
    this._sailsService.on('messageCreate').subscribe(message => {
      message.fromSocket = true;
      this._store.dispatch(new messageAction.CreateSuccessAction(message))
    });

    // Room Events
    this._sailsService.on('roomApplicationCreate').subscribe(application => {
      application.fromSocket = true;
      this._store.dispatch(new roomAction.ApplySuccessAction(application));
    });

    this._sailsService.on('roomApplicationStatusUpdate').subscribe(update => {
      this._store.dispatch(new roomAction.UpdateApplicationStatusSuccessAction(update))
    });

    this._sailsService.on('roomApplicationRate').subscribe(update => {
      this._store.dispatch(new roomAction.RateApplicationSuccessAction(update))
    });

    // Walker Events
    this._sailsService.on('walkerApplicationCreate').subscribe(application => {
      application.fromSocket = true;
      this._store.dispatch(new walkerAction.ApplySuccessAction(application));
    });

    this._sailsService.on('walkerApplicationStatusUpdate').subscribe(update => {
      this._store.dispatch(new walkerAction.UpdateApplicationStatusSuccessAction(update))
    });

    this._sailsService.on('walkerApplicationRate').subscribe(update => {
      this._store.dispatch(new walkerAction.RateApplicationSuccessAction(update))
    });

    this._sailsService.on('adoptComment').subscribe(comment => {
      this._store.dispatch(new adoptAction.CommentCreateEventAction(comment));
    });

    this._sailsService.on('lostFoundComment').subscribe(comment => {
      this._store.dispatch(new lostFoundAction.CommentCreateEventAction(comment));
    });

    // Notification Event
    this._sailsService.on('notificationNew').subscribe(notification => {
      this._store.dispatch(new notificationAction.NewEventAction(notification));
      this._utilsService.playNotificationSound();
    });

    // TODO: reconnect on connection lost
    this._sailsService.put(`${environment.apiEndpoint}/api/user/store-socket-id`, {
      'x-auth-token':  localStorage.getItem('token'),
      'x-selected-user':  localStorage.getItem('selectedUserId')
    });
  }

  onJoinClick(): void {
    this._store.dispatch(new authAction.FbLoginAction());
  }

  private getRouteDataByKey(key: string): any {
    return this._activatedRoute.snapshot.data[key] ||
      (this._activatedRoute.snapshot.children.length && this._activatedRoute.snapshot.children[0].data[key]);
  }
}
