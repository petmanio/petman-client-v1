import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove, clone } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar } from '@angular/material';
const smartcrop = require('smartcrop');

// TODO: add loader after before preview
export interface IWalkerAddComponent {
  onSaveWalker(): void
}

@Component({
  selector: 'app-walker-add',
  template: `
    <div class="columns">
      <div class="column pm-walker-add-container is-6 is-offset-3">
        <form #walkerForm="ngForm">
          <!--<div class="columns">-->
          <!--<md-input-container>-->
          <!--<input mdInput placeholder="Name (short description)" name="name" required [(ngModel)]="walker.name">-->
          <!--</md-input-container>  -->
          <!--</div>-->
          <div class="columns">
            <md-input-container>
              <textarea mdInput placeholder="Description" name="description" required [(ngModel)]="walker.description"></textarea>
            </md-input-container>
          </div>
          <div class="columns is-mobile">
            <div class="column is-4">
              <md-input-container>
                <input type="number" mdInput placeholder="Cost per day/$" name="cost" required [(ngModel)]="walker.cost" min="0"/>
              </md-input-container>
            </div>
            <div class="column is-4">
              <!--TODO: functionality for future-->
              <!--<md-input-container>-->
                <!--TODO: add more detailed placeholder-->
                <!--<input type="number" mdInput placeholder="Limit" name="limit" required [(ngModel)]="walker.limit" min="1"/>-->
              <!--</md-input-container>-->
            </div>
            <div class="column is-3">
              <button type="submit" class="btn btn-success pm-fr"
                      [color]="(walkerForm.form.valid) ? 'primary' : 'warn'"
                      md-button (click)="(walkerForm.form.valid) && onSaveWalker()">Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <!--<div class="column is-6 pm-preview-container">-->
      <!--<app-walker-details [walker]="walker"></app-walker-details>-->
      <!--</div>-->
    </div>

  `,
  styles: [`
    .pm-walker-add-container {
      margin-top: 15px;
    }

    md-input-container {
      width: 100%;
    }

    @media (max-width: 600px) and (orientation: portrait) {
      .pm-walker-add-container {
        padding-top: 0;
      }

      /deep/ .drag-box-message {
         display: none !important;
       }
    }
  `]
})
export class WalkerAddComponent implements OnInit, OnDestroy, IWalkerAddComponent {
  // TODO: add model type
  walker: any = {};
  private _destroyed$ = new Subject<boolean>();

  constructor(private _ref: ChangeDetectorRef, private _store: Store<fromRoot.State>, private _actions$: Actions,
              private _snackBar: MdSnackBar, private _router: Router) {
  }

  ngOnInit(): void {
    this._actions$
      .ofType(walkerAction.ActionTypes.CREATE_COMPLETE)
      .takeUntil(this._destroyed$)
      .do((action) => {
        this._router.navigate(['walker', action.payload.id, 'details']);
        // this._snackBar.open(`New walker successfully created`, null, {
        //   duration: 3000
        // });
        // TODO: navigate to details page
      })
      .subscribe();

  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
  }

  onSaveWalker(): void {
    const formData = clone(this.walker);
    this._store.dispatch(new walkerAction.CreateAction(formData));
  }

}
