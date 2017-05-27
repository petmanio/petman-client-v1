import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../../store';
import * as authAction from '../../store/auth/auth.actions';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs/Subject';

export interface IHomeComponent {
  fbLogin(): void
}

@Component({
  selector: 'app-home',
  template: `
    <!--<div class="columns" *ngIf="!(currentUser$ | async)">-->
      <!--<div class="column pm-login">-->
        <!--<button md-raised-button color="accent" class="pm-accent-color-white" (click)="fbLogin()">Login with Facebook</button>-->
      <!--</div>-->
    <!--</div>-->
    <div class="columns">
      <div class="column pm-home-card pm-home-card-sitters" routerLink="/rooms">
        <div class="pm-home-card-overlay"></div>
        <span class="pm-font-20">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum</span>
      </div>
      <div class="column pm-home-card pm-home-card-walkers" routerLink="/walkers">
        <div class="pm-home-card-overlay"></div>
        <span class="pm-font-20">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum</span>
      </div>
      <div class="column pm-home-card pm-home-card-adopt" routerLink="/adopt">
        <div class="pm-home-card-overlay"></div>
        <span class="pm-font-20">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum</span>
      </div>
    </div>
    <div class="columns">
      <div class="column pm-home-card pm-home-card-blog" routerLink="/blog">
        <div class="pm-home-card-overlay"></div>
        <span class="pm-font-20">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum</span>
      </div>
      <div class="column pm-home-card pm-home-card-locations" routerLink="/locations">
        <div class="pm-home-card-overlay"></div>
        <span class="pm-font-20">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum</span>
      </div>
    </div>
  `,
  styles: [`
    .pm-login {
      text-align: center;
      margin-top: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      align-items: center;
      justify-content: center;
      display: flex;
    }
    
    .pm-home-card {
      height: 350px;
      text-align: center;
      background-size: cover;
      align-items: center;
      justify-content: center;
      display: flex;
      margin: 0.75rem;
      position: relative;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
      cursor: pointer;
      color: #ffffff;
    }

    .pm-home-card:hover {
      /*color: #fcdd7f; */
    }
    
    .pm-home-card span {
      z-index: 20;
      width: 70%;
    }
    
    .pm-home-card-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #484848;
      opacity: 0.3;
    }
    
    .pm-home-card-sitters {
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/home.jpeg");
    }
    
    .pm-home-card-walkers {
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/walker.jpg");
    }

    .pm-home-card-adopt {
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/adopt.jpg");
    }

    .pm-home-card-blog {
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/news.jpg");
    }

    .pm-home-card-locations {
      /*noinspection CssUnknownTarget*/
      background-image: url("/assets/clinic.jpg");
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy, IHomeComponent {
  currentUser$: Observable<any>;
  private _destroyed$ = new Subject<boolean>();
  constructor(private _store: Store<fromRoot.State>, private _router: Router, private _actions$: Actions) {
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
  }

  public ngOnInit(): void {
    // TODO: use canDisabled
    this.currentUser$.subscribe($event => {
      if ($event) {
        this._router.navigate(['/']);
      }
    });

    this._actions$
      .ofType(authAction.ActionTypes.LOGIN_COMPLETE)
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
