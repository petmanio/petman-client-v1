import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { IUser, IWalker } from '../../models/api';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export interface IWalkersComponent {
  onScroll(): void,
  onFabClick(): void
}

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.component.html',
  styleUrls: ['./walkers.component.scss']
})
export class WalkersComponent implements OnInit, OnDestroy, IWalkersComponent {
  walkers$: Observable<IWalker[]>;
  currentUser$: Observable<IUser>;
  walkers: IWalker[];
  currentUser: IUser;
  private _destroyed$ = new Subject<boolean>();
  private _walkersSubscription: Subscription;
  private _currentUserSubscription: Subscription;

  private _skip = 0;
  private _limit = 6;
  private _count: number = null;
  constructor(private _store: Store<fromRoot.State>,
              private _router: Router,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this.walkers$ = this._store.select(fromRoot.getWalkerAll);
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
    this._walkersSubscription = this.walkers$.subscribe(walkers => this.walkers = walkers);
    this._currentUserSubscription = this.currentUser$.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._walkersSubscription.unsubscribe();
    this._currentUserSubscription.unsubscribe();
  }

  onScroll(): void {
    if (this._skip + this._limit < this._count) {
      this._skip += this._limit;
      this._store.dispatch(new walkerAction.ListAction({ limit: this._limit, skip: this._skip }));
    }
  }

  onFabClick(): void {
    if (this.currentUser) {
      this._router.navigate(['/walkers/add'])
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}
