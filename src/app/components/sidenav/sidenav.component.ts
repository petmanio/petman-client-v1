import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';
import { IUser } from '../../models/api';

interface ISidenavComponent {
  onClick($event: Event): void,
  onSelectedUserChange($event): void
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() open = false;
  @Input() mode: string;
  @Output() onItemActivate = new EventEmitter();
  @Output() onClose = new EventEmitter();
  isHomeActive;
  // TODO: add observable type for all components
  selectedUser$: Observable<IUser>;
  currentUser$: Observable<IUser>;
  constructor(private _router: Router, private _store: Store<fromRoot.State>) {
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
  }

  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {

      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this._router.url === '/' ? 'is-active' : '';
        // TODO: find more better way
      }
    });
  }

  onClick($event: Event): void {
    $event.stopPropagation();
  }

  onSelectedUserChange($event): void {
    this._store.dispatch(new authAction.ChangeCurrentUserAction($event.value));
  }
}
