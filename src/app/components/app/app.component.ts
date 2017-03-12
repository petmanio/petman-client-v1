import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router , NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilService } from "../../services/util/util.service";

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import * as auth from '../../store/auth/auth.actions';

export interface IAppComponent {
  closeSidenav(force: boolean): void,
  toggleSidenav($event: Event): void,
  // onClick($event: Event): void,
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
        <span class="home" [routerLink]="(currentUser$ | async) ? '/' : '/welcome'">Walkypet</span>
        <span class="toolbar-spacer"></span>
        <button md-raised-button
                color="primary"
                routerLink="/join"
                *ngIf="toolbarRightButtons.indexOf('JOIN') !== -1">
          Join
        </button>
        <div *ngIf="toolbarRightButtons.indexOf('ACTIONS') !== -1">
          <button md-icon-button
                  [mdMenuTriggerFor]="menu">
            <md-icon>more_vert</md-icon>
          </button>
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
      </app-toolbar>
      <!--TODO: pass items-->
      <app-sidenav [open]="currentSideNavState" 
        (onItemActivate)="closeSidenav()"
        (onClose)="closeSidenav(true)"
        (onItemActivate)="closeSidenav()"
        [mode]="sideNavMode" 
        [currentUser]="currentUser$ | async">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // '(click)': 'onClick($event)',
  }
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  //TODO: import model
  currentUser$: Observable<any>;
  toolbarRightButtons: string[] = [];
  sideNavMode: string = 'side';
  currentSideNavState: boolean;
  xhrListener: Observable<boolean> = UtilService.XHRListener();

  constructor(private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private zone: NgZone,
              private utilsService: UtilService) {
    UtilService.initScripts();
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.currentUser$ = this.store.select(fromRoot.getAuthCurrentUser);
  }

  public ngOnInit(): void {
    //FIXME: find better way
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.zone.run(() => {
          this.toolbarRightButtons = this.getRouteDataByKey('toolbarRightButtons') || [];
          this.ref.markForCheck();
        })

      }
    });

    if (UtilService.getCurrentDevice() === 'MOBILE') {
      this.store.dispatch(new layout.CloseSidenavAction());
      this.sideNavMode = 'push';
    } else {
      this.store.dispatch(new layout.OpenSidenavAction());
    }

    this.showSidenav$.subscribe((event) => this.currentSideNavState = event);
  }

  closeSidenav(force: boolean): void {
    if (force || UtilService.getCurrentDevice() === 'MOBILE') {
      this.store.dispatch(new layout.CloseSidenavAction());
    }
  }

  toggleSidenav($event: Event): void {
    $event.stopPropagation();
    if (this.currentSideNavState) {
      this.store.dispatch(new layout.CloseSidenavAction());
    } else {
      this.store.dispatch(new layout.OpenSidenavAction());
    }
  }

  // onClick($event: Event): void {
  //   $event.stopPropagation();
  //   this.store.dispatch(new layout.CloseSidenavAction());
  // }

  logOut(): void {
    // this.store.dispatch(new auth.LogoutAction());
    //TODO: use complete action
    //TODO: use dispatch
    localStorage.removeItem('token');
    setTimeout(() => {
      this.router.navigate(['/welcome']);
      this.store.dispatch(new auth.LogoutCompleteAction());
    }, 300);
    // location.href = '/';
  }

  private getRouteDataByKey(key: string): any {
    return this.activatedRoute.snapshot.data[key] ||
      (this.activatedRoute.snapshot.children.length && this.activatedRoute.snapshot.children[0].data[key]);
  }
}
