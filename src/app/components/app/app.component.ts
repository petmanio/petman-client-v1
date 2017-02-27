import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router , NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilService } from "../../services/util/util.service";

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';
import * as auth from '../../store/auth/auth.actions';

export interface IAppComponent {
  closeSidenav(): void,
  openSidenav($event: Event): void,
  onClick($event: Event): void,
  logOut(): void
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick($event)',
  }
})
export class AppComponent implements OnInit, IAppComponent {
  showSidenav$: Observable<boolean>;
  //TODO: import model
  currentUser$: Observable<any>;
  toolbarRightButtons: string[] = [];

  constructor(private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
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
        this.toolbarRightButtons = this.getRouteDataByKey('toolbarRightButtons') || [];
        this.ref.markForCheck();
      }
    });
  }

  closeSidenav(): void {
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav($event: Event): void {
    $event.stopPropagation();
    this.store.dispatch(new layout.OpenSidenavAction());
  }

  onClick($event: Event): void {
    $event.stopPropagation();
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  logOut(): void {
    // this.store.dispatch(new auth.LogoutAction());
    //TODO: use complete action
    //TODO: use dispatch
    // this.router.navigate(['/welcome']);
    localStorage.removeItem('token');
    location.href = '/';
  }

  private getRouteDataByKey(key: string): any {
    return this.activatedRoute.snapshot.data[key] ||
      (this.activatedRoute.snapshot.children.length && this.activatedRoute.snapshot.children[0].data[key]);
  }
}
