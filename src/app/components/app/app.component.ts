import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import * as layout from '../../store/layout/layout.actions';

export interface IAppComponent {
  closeSidenav(): void,
  openSidenav($event: Event): void,
  onClick($event: Event): void
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
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
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
}
