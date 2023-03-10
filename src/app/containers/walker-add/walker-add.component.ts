import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { IWalkerCreateRequest } from '../../models/api';

export interface IWalkerAddComponent {
  onSaveWalker(): void
}

@Component({
  selector: 'app-walker-add',
  templateUrl: './walker-add.component.html',
  styleUrls: ['./walker-add.component.scss']
})
export class WalkerAddComponent implements OnInit, OnDestroy, IWalkerAddComponent {
  walker: IWalkerCreateRequest = {
    description: '',
    cost: null
  };
  private _destroyed$ = new Subject<boolean>();

  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions, private _router: Router) {
  }

  ngOnInit(): void {
    this._actions$
      .ofType(walkerAction.ActionTypes.CREATE_SUCCESS)
      .takeUntil(this._destroyed$)
      .do(action => this._router.navigate(['walkers', action.payload.id, 'details']))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onSaveWalker(): void {
    this._store.dispatch(new walkerAction.CreateAction(this.walker));
  }

}
