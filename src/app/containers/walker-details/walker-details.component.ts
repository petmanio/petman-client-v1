import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IUser, IWalker, IWalkerApplication } from '../../models/api';
import { MdDialog, MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import '@ngrx/core/add/operator/select';
import { ShareDialogComponent } from '../../components/share-dialog/share-dialog.component';
import { WalkerReviewsListDialogComponent } from '../../components/walker-reviews-list-dialog/walker-reviews-list-dialog.component';
import * as walkerAction from '../../store/walker/walker.actions'
import * as fromRoot from '../../store';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs/Subject';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';

export interface IWalkerDetailsComponent {
  onShareClick(): void,
  onSeeReviewsClick(): void,
  onDeleteClick(): void
}

@Component({
  selector: 'app-walker-details',
  templateUrl: './walker-details.component.html',
  styleUrls: ['./walker-details.component.scss']
})
export class WalkerDetailsComponent implements OnInit, OnDestroy, IWalkerDetailsComponent {
  walker$: Observable<IWalker>;
  currentUser$: Observable<IUser>;
  applications$: Observable<{total: number, list: IWalkerApplication[]}>;
  walker: IWalker;
  currentUser: IUser;
  applications: {total: number, list: IWalkerApplication[]};
  private _destroyed$ = new Subject<boolean>();
  private _actionsSubscription: Subscription;
  private _walkerSubscription: Subscription;
  private _currentUserSubscription: Subscription;
  private _applicationsSubscription: Subscription;

  constructor(private _store: Store<fromRoot.State>,
              private _route: ActivatedRoute,
              private _dialog: MdDialog,
              private _router: Router,
              private _actions$: Actions,
              private _snackBar: MdSnackBar,
              private _translateService: TranslateService) {
    this._actionsSubscription = _route.params
      .select<string>('walkerId')
      .map(id => new walkerAction.SelectAction(id))
      .subscribe(_store);

    this.walker$ = this._store.select(fromRoot.getSelectedWalker);
    this.currentUser$ = this._store.select(fromRoot.getAuthCurrentUser);
    this.applications$ = this._store.select(fromRoot.getSelectedWalkerMyApplications);
    this._walkerSubscription = this.walker$.subscribe(walker => {
      this.walker = walker;
      // TODO: check using resolvers
      if (!this.walker.applicationsLoaded) {
        this._store.dispatch(new walkerAction.ApplicationListAction({walkerId: this.walker.id}));
      }
    });
    this._currentUserSubscription = this.currentUser$.subscribe(user => this.currentUser = user);
    this._applicationsSubscription = this.applications$.subscribe(applications => this.applications = applications);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._destroyed$.next(true);
    this._actionsSubscription.unsubscribe();
    this._walkerSubscription.unsubscribe();
    this._currentUserSubscription.unsubscribe();
    this._applicationsSubscription.unsubscribe();
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'share',
            href: `${location.origin}/walkers/${this.walker.id}/details`,
            hashtag: '#Petman'
          };

          FB.ui(fbShareOptions, response => {});
        }
      }
    });
  }

  onSeeReviewsClick(): void {
    const _dialogRef = this._dialog.open(WalkerReviewsListDialogComponent);
    _dialogRef.componentInstance.walkerId = this.walker.id
  }

  onDeleteClick(): void {
    const _dialogRef = this._dialog.open(ConfirmDialogComponent);
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._store.dispatch(new walkerAction.DeleteAction({walkerId: this.walker.id}));
        this._actions$
          .ofType(walkerAction.ActionTypes.DELETE_SUCCESS)
          .takeUntil(this._destroyed$)
          .do(() => this._router.navigate(['walkers']))
          .subscribe();
      }
    });
  }

  onApplyClick(): void {
    if (this.currentUser) {
      if (this.applications.list.some(application => application.status === 'WAITING')) {
        this._snackBar.open(this._translateService.instant('sorry_you_have_unfinished_application'), null, {
          duration: 3000
        });
      } else {
        this._store.dispatch(new walkerAction.ApplyAction({walkerId: this.walker.id}));
      }
    } else {
      this._snackBar.open(this._translateService.instant('please_login'), this._translateService.instant('login'), {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    }
  }
}
