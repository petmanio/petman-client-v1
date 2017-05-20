import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { clone } from 'lodash';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store';
import * as walkerAction from '../../store/walker/walker.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IUser, IWalker, IWalkerApplication } from '../../models/api';
import { WalkerApplicationsListComponent } from '../walker-applications-list/walker-applications-list.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist';
import { WalkerReviewDialogComponent } from '../walker-review-dialog/walker-review-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

export interface IWalkerDetailsComponent {
  onRatingRowClick(): void
  onApplicationSelect(application: IWalkerApplication): void,
  onActionClick(status: string): void,
  formatDate(date): string
}

@Component({
  selector: 'app-walker-details',
  template: `
    <md-card>
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <md-card-header>
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (walkerWalker$ | async)?.user.userData.avatar + ')'}"></div>
              <md-card-title>
                {{(walkerWalker$ | async)?.user.userData.firstName}} {{(walkerWalker$ | async)?.user.userData.lastName}}</md-card-title>
              <md-card-subtitle>
              <span class="pm-font-12 pm-color-gray">
                {{formatDate((walkerWalker$ | async)?.createdAt)}}
              </span>
              </md-card-subtitle>
            </md-card-header>
          </div>
        </div>
        <div class="columns">
          <div class="column column is-10 is-offset-1">
            <div class="pm-details-actions">
              <span class="pm-font-14 pm-color-gray"><i class="mdi mdi-cash-usd"></i> {{(walkerWalker$ | async)?.cost}}$ / day</span>&nbsp;
              <rating [ngModel]="averageRating"
                      [max]="5"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="true"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
              <button md-button class="pm-walker-action-apply-edit" (click)="onRatingRowClick()" *ngIf="!(walkerWalker$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-gray">Apply &nbsp;<i class="mdi mdi-plus"></i></span>
              </button>
              <button md-button class="pm-walker-action-apply-edit" (click)="onRatingRowClick()" *ngIf="(walkerWalker$ | async)?.isOwner">
                <span class="pm-font-14 pm-color-gray">Edit &nbsp;<i class="mdi mdi-table-edit"></i></span>
              </button>
              &nbsp;&nbsp;
              <button md-icon-button (click)="onShareClick()">
                <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
              </button>
            </div>
            <br/>
            <md-divider></md-divider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <span class="pm-color-gray pm-font-16">{{(walkerWalker$ | async)?.description}}</span>
          </div>
        </div>
        <div class="columns">
          <!--<div class="column column is-4 is-offset-1">-->
            <!--<div class="pm-font-16 pm-color-gray pm-history-label">Review statistics</div>-->
            <!--<app-walker-statistics [applications]="finishedApplications"></app-walker-statistics>-->
          <!--</div>-->
          <div class="column is-10 is-offset-1">
            <div class="pm-font-16 pm-color-gray pm-history-label">History & reviews <i class="mdi mdi-history"></i></div>
            <app-walker-reviews-list [applications]="finishedApplications" [walker]="walkerWalker$ | async"></app-walker-reviews-list>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4-desktop is-5-tablet is-offset-1">
            <span class="pm-font-16 pm-color-gray">{{(walkerWalker$ | async)?.isOwner ? 'Application requests' : 'My applications'}} 
              <i class="mdi mdi-application"></i></span>
            <app-walker-applications-list [applications]="inProgressApplications"
                                        [walker]="walkerWalker$ | async"
                                        (onApplicationClick)="onApplicationSelect($event)"></app-walker-applications-list>
          </div>
          <div class="column is-6-desktop is-5-tablet pm-application-info-window" *ngIf="selectedApplication">
            <div class="pm-font-16 pm-color-gray pm-action-label">Status <i class="mdi mdi-check-all"></i></div>
            <app-walker-application-actions [walker]="walkerWalker$ | async"
                                          [application]="selectedApplication"
                                          (onActionClick)="onActionClick($event)"></app-walker-application-actions>
            <div class="pm-font-16 pm-color-gray pm-message-label">Chat history <i class="mdi mdi-wechat"></i></div>
            <app-walker-application-messages [walker]="walkerWalker$ | async"
                                           [application]="selectedApplication"></app-walker-application-messages>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    app-walker-application-actions {
      /*margin-top: 25px;*/
    }
    app-walker-applications-list {
      max-height: 640px;
      overflow-x: auto;
    }
    
    app-walker-application-messages {
      /*min-height: 200px;*/
      max-height: 500px;
      overflow-x: auto;
    }

    app-walker-reviews-list {
      max-height: 500px;
      overflow-x: auto;
    }
    
    .pm-message-label {
      margin-top: 20px;
      padding-right: 10px;
      text-align: right;
    }
    
    .pm-action-label {
      margin-top: 0;
      text-align: right;
      padding-right: 10px;
      margin-bottom: 15px;
    }

    .pm-history-label {
      margin-top: 25px;
      text-align: left;
      padding-right: 10px;
      margin-bottom: 15px;
    }

    .pm-details-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .pm-walker-action-apply-edit {
      margin-left: auto;
    }

  `]
})
export class WalkerDetailsComponent implements OnInit, OnDestroy, IWalkerDetailsComponent {
  @ViewChild(WalkerApplicationsListComponent) _walkerApplicationList;
  // TODO: update attribute name
  walkerWalker$: Observable<any>;
  currentUser$: Observable<any>;
  currentUser: IUser;
  averageRating: number;
  selectedApplication: IWalkerApplication;
  inProgressApplications: IWalkerApplication[];
  finishedApplications: IWalkerApplication[];
  walker: IWalker;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    loop: true
  };
  private _walkerId: number;
  private _destroyed$ = new Subject<boolean>();
  private _walkerListener;
  private _routeListener;
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar,
              private _router: Router,
              private _utilService: UtilService,
              private _actions$: Actions) {
    this.walkerWalker$ = _store.select(fromRoot.getWalkerWalker);
    this.currentUser$ = _store.select(fromRoot.getAuthCurrentUser);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._routeListener = this._activatedRoute.params.subscribe((params: Params) => {
      this._walkerId = parseInt(params['walkerId'], 10);
      if (!this._walkerId) {
        // TODO: use global error handling
        throw new Error('WalkerDetailsComponent: walkerId is not defined');
      }
      return this._store.dispatch(new walkerAction.GetByIdAction({walkerId: this._walkerId}));
    });

    this._walkerListener = this.walkerWalker$.subscribe($event => {
      if ($event) {
        this.walker = $event;
        this.inProgressApplications = this.walker.applications.filter(application => application.status !== 'FINISHED');
        this.finishedApplications = this.walker.applications.filter(application => application.status === 'FINISHED');
        if (this.inProgressApplications.length) {
          this.selectedApplication = this.inProgressApplications[0];
          this._walkerApplicationList.selected = 0;
        } else {
          this.selectedApplication = null;
        }
        this.averageRating = UtilService.countAverage(this.walker.applications.filter(application => application.status === 'FINISHED'));
      }
    });

    this.currentUser$.subscribe($event => this.currentUser = $event);
    // TODO: load data from server after complete using data from server, push application inside reducer, change socket part also
    // this._actions$
    //   .ofType(walkerAction.ActionTypes.APPLY_COMPLETE)
    //   .takeUntil(this._destroyed$)
    //   .do(() => {
    //     this._store.dispatch(new walkerAction.GetByIdAction({walkerId: this._walkerId}));
    //   })
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._walkerListener.unsubscribe();
    this._routeListener.unsubscribe();
  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'feed',
            name: 'Petman',
            link: `${location.origin}/walkers/${this.walker.id}/details`,
            description: this.walker.description
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new walkerAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }

  onRatingRowClick(): void {
    if (this.walker.isOwner) {
      this._snackBar.open(`Sorry but now edit functionality not available`, null, {
        duration: 3000
      });
    } else if (this.inProgressApplications.some(application => application.status === 'IN_PROGRESS')) {
      this._snackBar.open(`Sorry but you have in progress application`, null, {
        duration: 3000
      });
    } else if (!this.currentUser) {
      this._snackBar.open(`Please login for apply`, 'Login', {
        duration: 3000
      })
        .onAction()
        .subscribe($event => this._router.navigate(['/join']))
    } else {
      this._store.dispatch(new walkerAction.ApplyAction({walkerId: this._walkerId}));
    }
  }

  onApplicationSelect(application: IWalkerApplication): void {
    this.selectedApplication = application;
  }

  onActionClick(status: 'IN_PROGRESS' | 'CANCELED_BY_PROVIDER' | 'CANCELED_BY_CONSUMER' | 'CONFIRMED' | 'FINISHED'): void {
    const application = clone<IWalkerApplication>(this.selectedApplication);
    application.status = status;

    if (application.status === 'FINISHED') {
      if (this.walker.isOwner) {
        this._store.dispatch(new walkerAction.UpdateApplicationAction(application));
      } else  {
        const _dialogRef = this._dialog.open(WalkerReviewDialogComponent);
        _dialogRef.afterClosed().subscribe(reviewOptions => {
          if (reviewOptions) {
            application.rating = reviewOptions.rating;
            application.review = reviewOptions.review;
            this._store.dispatch(new walkerAction.UpdateApplicationAction(application));
          }
        });
      }

    } else {
      this._store.dispatch(new walkerAction.UpdateApplicationAction(application));
    }
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }

}
