import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilService } from '../../services/util/util.service';

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import * as auth from '../../store/auth/auth.actions';
import * as authAction from '../../store/auth/auth.actions';
import { INotification } from '../../models/api';
import { SailsService } from 'angular2-sails';
import { environment } from '../../../environments/environment';
import * as roomAction from '../../store/room/room.actions';
import * as walkerAction from '../../store/walker/walker.actions';
import * as adoptAction from '../../store/adopt/adopt.actions';
import * as notificationAction from '../../store/notification/notification.actions';
import { TranslateService } from 'ng2-translate';

export interface IAppComponent {
  closeSidenav(): void,
  toggleSidenav($event: Event): void,
  onScroll(): void,
  onNotificationMenuOpen(): void,
  onNotificationClick(notification: INotification): void
  logOut(): void,
  initSocket(): void,
  onJoinClick(): void,
  onLanguageChange($event): void
}

@Component({
  selector: 'app-root',
  template: `
    <md-progress-bar mode="indeterminate" *ngIf="xhrListener | async"></md-progress-bar>
    <app-layout>
      <!--TODO: update layout, sideNav components component-->
      <app-toolbar (toggleMenu)="toggleSidenav($event)">
        <!--TODO: use route config for main route-->
        <span class="home" [routerLink]="'/'">Petman <span class="pm-font-9">beta</span></span>
        <span class="toolbar-spacer"></span>
        <div class="pm-language">
          <md-select (change)="onLanguageChange($event)" [(ngModel)]="lang">
            <md-option value="en">En</md-option>
            <md-option value="am">Am</md-option>
          </md-select>
        </div>
        <button md-raised-button
                color="accent"
                class="pm-accent-color-white"
                routerLink="/join"
                *ngIf="!(currentUser$ | async)">{{'join_us' | translate}}</button>
        <!--TODO: find better solution-->
        <div class="pm-toolbar-actions" *ngIf="(currentUser$ | async)">
          <button md-icon-button
                  [mdMenuTriggerFor]="notification" (onMenuOpen)="onNotificationMenuOpen()">
            <md-icon *ngIf="unseenNotificationsCount">notifications</md-icon>
            <span *ngIf="unseenNotificationsCount" class="pm-unseen-count">{{unseenNotificationsCount}}</span>
            <md-icon *ngIf="!unseenNotificationsCount">notifications_none</md-icon>
          </button>
          <md-menu #notification="mdMenu" [overlapTrigger]="false"
                   yPosition="above" xPosition="before" class="pm-notification-menu">
            <div class="pm-notification-list" infinite-scroll
                 (scrolled)="onScroll()"
                 [infiniteScrollDistance]="2"
                 [infiniteScrollThrottle]="300"
                 [scrollWindow]="false">
              <div *ngIf="!(notifications$ | async)?.list.length" class="pm-font-14 pm-color-gray pm-text-center pm-no-notifications">
                {{'no_notifications_yet' | translate}}</div>
              <app-notifications [notifications]="(notifications$ | async)?.list" 
                                 (onNotificationClick)="onNotificationClick($event)"></app-notifications>
            </div>
          </md-menu>
          <div md-card-avatar class="pm-cart-avatar pm-cursor-pointer" [mdMenuTriggerFor]="menu"
               [ngStyle]="{'background-image': 'url(' + (currentUser$ | async)?.userData.avatar + ')'}"></div>
          <md-menu #menu="mdMenu" [overlapTrigger]="false"
                   yPosition="above" xPosition="before">
            <!--<button md-menu-item>-->
              <!--<md-icon>account_circle</md-icon>-->
              <!--<span>Account</span>-->
            <!--</button>-->
            <button md-menu-item (click)="logOut()">
              <md-icon>power_settings_new</md-icon>
              <span>{{'log_out' | translate}}</span>
            </button>
          </md-menu>
        </div>
      </app-toolbar>
      <!--TODO: pass items-->
      <app-sidenav [open]="currentSideNavState"
                   (onClose)="closeSidenav()"
                   [mode]="sideNavMode">
        <router-outlet></router-outlet>
      </app-sidenav>
    </app-layout>
  `,
  styles: [`
    .home {
      cursor: pointer;
      padding: 5px;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    md-progress-bar {
      position: fixed;
      z-index: 10;
    }

    .pm-toolbar-actions {
      display: flex;
    }

    .pm-language {
      display: flex;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }

    .pm-language md-select {
      margin: 0 auto;
    }
    
    /deep/ .pm-language .mat-select-trigger {
       min-width: 50px;
       width: 50px;
    }

    /deep/ .pm-language .mat-select-value {
       color: #ffffff;
     }

    /deep/ .pm-language .mat-select-arrow {
      color: #ffffff;
    }


    /deep/ .mat-menu-panel.pm-notification-menu {
       width: 380px;
       max-width: 380px;
       margin-left: -100px;
    }

    @media (max-width: 600px) and (orientation: portrait) {
      /deep/ .mat-menu-panel.pm-notification-menu {
        margin-left: auto;
        width: 280px;
        max-width: 280px;
      }

      .pm-notification-list {
        width: 260px !important;
      }
    }
    
    .pm-unseen-count {
      position: absolute;
      right: 5px;
      font-size: 12px;
      top: 0;
      padding: 1px 3px;
      background: #fc6f6f;
      line-height: initial;
      opacity: 0.8;
      border-radius: 3px;
    }
    
    .pm-notification-list {
      width: 380px;
      padding: 0;
      margin: 0;
      max-height: 500px;
      overflow: auto;
    }
    
    .pm-no-notifications {
      margin-top: 20px;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  // TODO: import model
  currentUser$: Observable<any>;
  notifications$: Observable<any>;
  notifications: INotification[];
  toolbarRightButtons: string[] = [];
  sideNavMode = 'side';
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
    this.notifications$ = this._store.select(fromRoot.getNotificationList);
    this._translate.setDefaultLang('en');

    // TODO: use mdIconRegistry
    // _mdIconRegistry
    //   .addSvgIcon('thumb-up',
    //     sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/thumbup-icon.svg'))
    //   .addSvgIconSetInNamespace('mdi',
    //     _sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/core-icon-set.svg'))
    //   .registerFontClassAlias('mdi', 'mdi');
  }

  ngOnInit(): void {
    let notificationListReceived;
    this.currentUser$.subscribe(($event) => {
      if ($event && !notificationListReceived) {
        this._store.dispatch(new notificationAction.ListAction({skip: this._skip, limit: this._limit}));
        notificationListReceived = true;
      } else if (!$event) {
        this._store.dispatch(new notificationAction.ListClearAction({}));
        notificationListReceived = false;
      }
    });

    if (UtilService.getCurrentDevice() === 'DESKTOP') {
      this._store.dispatch(new layout.OpenSidenavAction());
    } else {
      this._store.dispatch(new layout.CloseSidenavAction());
    }

    // FIXME: find better way
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {} else if (event instanceof NavigationEnd) {
        if (UtilService.getCurrentDevice() !== 'DESKTOP') {
          this._store.dispatch(new layout.CloseSidenavAction());
        }
        // this._zone.run(() => {
        //   this.toolbarRightButtons = this.getRouteDataByKey('toolbarRightButtons') || [];
        //   const showSideNav = this.getRouteDataByKey('showSidenav');
        //   if (typeof showSideNav !== 'undefined') {
        //     if (showSideNav && UtilService.getCurrentDevice() === 'DESKTOP') {
        //       this._store.dispatch(new layout.OpenSidenavAction());
        //     } else {
        //       this._store.dispatch(new layout.CloseSidenavAction());
        //     }
        //   }
        //   this._ref.markForCheck();
        // })

      }
    });

    this.notifications$.subscribe($event => {
      this._count = $event.count;
      this.notifications = $event.list;
      this.unseenNotificationsCount = $event.list.filter((n) => !n.seen).length;
    });

    this.initSocket();

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

  onNotificationClick(notification: INotification): void {
    if (notification.roomApplicationCreate || notification.roomApplicationMessageCreate || notification.roomApplicationStatusUpdate) {
      const id = (notification.roomApplicationCreate
      || notification.roomApplicationMessageCreate
      || notification.roomApplicationStatusUpdate)['room'];
      this._router.navigate(['rooms', id, 'details'])
    } else if (notification.walkerApplicationCreate || notification.walkerApplicationMessageCreate
      || notification.walkerApplicationStatusUpdate) {
      const id = (notification.walkerApplicationCreate
      || notification.walkerApplicationMessageCreate
      || notification.walkerApplicationStatusUpdate)['walker'];
      this._router.navigate(['walkers', id, 'details'])
    } else if (notification.adoptCommentCreate) {
      const id = notification.adoptCommentCreate['adopt'];
      this._router.navigate(['adopt', id, 'details'])
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
    localStorage.removeItem('token');
    setTimeout(() => {
      this._router.navigate(['/welcome']);
      this._store.dispatch(new auth.LogoutCompleteAction({}));
    }, 300);
    // location.h_ref = '/';
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

    // Room Events
    this._sailsService.on('roomApplicationMessage').subscribe(message => {
      this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction(message))
    });

    this._sailsService.on('roomApplicationUpdate').subscribe(update => {
      this._store.dispatch(new roomAction.UpdateApplicationCompleteAction(update))
    });

    // TODO: use another action for adding new application
    this._sailsService.on('roomApplicationCreate').subscribe(application => {
      this._store.dispatch(new roomAction.GetByIdAction({roomId: application.room}));
    });

    // Walker Events
    this._sailsService.on('walkerApplicationMessage').subscribe(message => {
      this._store.dispatch(new walkerAction.ApplicationMessageCreateEventAction(message))
    });

    this._sailsService.on('walkerApplicationUpdate').subscribe(update => {
      this._store.dispatch(new walkerAction.UpdateApplicationCompleteAction(update))
    });

    // TODO: use another action for adding new application
    this._sailsService.on('walkerApplicationCreate').subscribe(application => {
      this._store.dispatch(new walkerAction.GetByIdAction({walkerId: application.walker}));
    });

    this._sailsService.on('adoptComment').subscribe(comment => {
      this._store.dispatch(new adoptAction.CommentCreateEventAction(comment));
    });

    // Notification Event
    this._sailsService.on('notificationNew').subscribe(notification => {
      this._store.dispatch(new notificationAction.NewEventAction(notification));
    });
    // TODO: reconnect on connection lost

    this.currentUser$.subscribe(($event) => {
      if ($event) {
        this._sailsService.put(`${environment.apiEndpoint}/api/user/store-socket-id`, { 'x-auth-token':  localStorage.getItem('token') });
      }
      // TODO: fix disconnect
      // else if (!$event && socketConnection && socketConnection.connected) {
      //   this._sailsService.disconnect();
      // }
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
