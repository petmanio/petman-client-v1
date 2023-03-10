import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs/Subject';

export interface IJoinComponent {
  fbLogin(): void
}

@Component({
  selector: 'app-join',
  template: `
    <div class="columns">
      <div class="column pm-login">
        <button md-raised-button class="pm-button-facebook" (click)="fbLogin()">
          {{'login_with_facebook' | translate}}</button>
      </div>
    </div>
  `,
  styles: [`
    .pm-login {
      margin: 0.75rem;
      text-align: center;
      margin-top: 20px;
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/join-cover.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      height: 400px;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    button {
      /*font-size: 20px;*/
    }
  `]
})
export class JoinComponent implements OnInit, OnDestroy, IJoinComponent {
  selectedUser$: Observable<any>;
  private _destroyed$ = new Subject<boolean>();
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _actions$: Actions) {
    this.selectedUser$ = this._store.select(fromRoot.getAuthSelectedUser);
  }

  public ngOnInit(): void {
    // TODO: use canDisabled
    this.selectedUser$.subscribe($event => {
      if ($event) {
        this._router.navigate(['/']);
      }
    });

    this._actions$
      .ofType(authAction.ActionTypes.LOGIN_SUCCESS)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['/']);
      })
      .subscribe();

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  fbLogin(): void {
    this._store.dispatch(new authAction.FbLoginAction());
  }
}
