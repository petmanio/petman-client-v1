import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router , NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilService } from '../../services/util/util.service';

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import * as auth from '../../store/auth/auth.actions';
import { IUser } from '../../models/api';
import { SailsService } from 'angular2-sails';
import { environment } from '../../../environments/environment';
import * as roomAction from '../../store/room/room.actions';

export interface IAppComponent {
  closeSidenav(): void,
  toggleSidenav($event: Event): void,
  logOut(): void
}

@Component({
  selector: 'app-root',
  template: `
    <md-progress-bar mode="indeterminate" *ngIf="xhrListener | async"></md-progress-bar>
    <app-layout>
    <!--TODO: update layout, sideNav components component-->
      <app-toolbar (toggleMenu)="toggleSidenav($event)">
        <!--TODO: use route config for main route-->
        <span class="home" [routerLink]="(currentUser$ | async) ? '/' : '/welcome'">Petman</span>
        <span class="toolbar-spacer"></span>
        <button md-raised-button
                color="primary"
                routerLink="/join"
                *ngIf="toolbarRightButtons.indexOf('JOIN') !== -1">
          Join
        </button>
        <!--TODO: find better solution-->
        <div *ngIf="toolbarRightButtons.indexOf('ACTIONS') !== -1">
          <div class="columns is-mobile">
            <div class="column">
              <button md-icon-button
                      [mdMenuTriggerFor]="notification">
                <md-icon>notifications</md-icon>
              </button>
              <md-menu #notification="mdMenu">
                <md-list>
                  <md-list-item>notifications</md-list-item>
                </md-list>
              </md-menu>
            </div>
            <div class="column">
              <div md-card-avatar class="pm-cart-avatar pm-cursor-pointer" [mdMenuTriggerFor]="menu"
                   [ngStyle]="{'background-image': 'url(' + (currentUser$ | async)?.userData.avatar + ')'}"></div>
              <md-menu #menu="mdMenu">
                <button md-menu-item>
                  <md-icon>account_circle</md-icon>
                  <span>Account</span>
                </button>
                <button md-menu-item (click)="logOut()">
                  <md-icon>power_settings_new</md-icon>
                  <span>Log out</span>
                </button>
              </md-menu>
            </div>
          </div>
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

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  // TODO: import model
  currentUser$: Observable<any>;
  currentUser: IUser;
  toolbarRightButtons: string[] = [];
  sideNavMode = 'side';
  currentSideNavState: boolean;
  // TODO: read from store
  xhrListener: Observable<boolean> = UtilService.XHRListener();

  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _ref: ChangeDetectorRef,
              private _zone: NgZone,
              private _utilsService: UtilService,
              private _sailsService: SailsService) {
    UtilService.initScripts();
    this.showSidenav$ = this._store.select(fromRoot.getShowSidenav);
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    // FIXME: find better way
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this._zone.run(() => {
          this.toolbarRightButtons = this.getRouteDataByKey('toolbarRightButtons') || [];
          const showSideNav = this.getRouteDataByKey('showSidenav');
          if (typeof showSideNav !== 'undefined') {
            if (showSideNav && UtilService.getCurrentDevice() !== 'MOBILE') {
              this._store.dispatch(new layout.OpenSidenavAction());
            } else {
              this._store.dispatch(new layout.CloseSidenavAction());
            }
          }
          this._ref.markForCheck();
        })

      }
    });

    this.initSocket();

    if (UtilService.getCurrentDevice() === 'MOBILE') {
      this.sideNavMode = 'push';
    }

    this.showSidenav$.subscribe((event) => this.currentSideNavState = event);
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
    let socketConnection;

    const opts = {
      url: environment.apiEndpoint,
      transports: ['polling', 'websocket'],
      headers: {'x-auth-token': localStorage.getItem('token')},
      autoConnect: false,
      environment: environment.production ? 'production' : 'development'
    };

    this.currentUser$.subscribe(($event) => {
      if ($event && (!socketConnection || !socketConnection.connected)) {
        this._sailsService.connect(opts).subscribe(connection => socketConnection = connection);

        this._sailsService.on('connect').subscribe(() => {
          this._sailsService.put(`${environment.apiEndpoint}/api/user/store-socket-id`, { 'x-auth-token':  localStorage.getItem('token') });
        });

        this._sailsService.on('roomApplicationMessage').subscribe(message => {
          this._store.dispatch(new roomAction.ApplicationMessageCreateEventAction(message))
        });
        // TODO: reconnect on connection lost
      } else if (!$event && socketConnection && socketConnection.connected) {
        // TODO: fix disconnect
        this._sailsService.disconnect();
      }
    });
  }

  private getRouteDataByKey(key: string): any {
    return this._activatedRoute.snapshot.data[key] ||
      (this._activatedRoute.snapshot.children.length && this._activatedRoute.snapshot.children[0].data[key]);
  }
}
