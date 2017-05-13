import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromRoot from '../../store';
import * as adoptAction from '../../store/adopt/adopt.actions';
import { Subject } from 'rxjs/Subject';
import { UtilService } from '../../services/util/util.service';
import { IAdopt } from '../../models/api';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper/dist';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

export interface IAdoptDetailsComponent {
  formatDate(date): string,
  onShareClick(): void
}

@Component({
  selector: 'app-adopt-details',
  template: `
    <md-card>
      <md-card-content>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <md-card-header>
              <div md-card-avatar class="pm-cart-avatar"
                   [ngStyle]="{'background-image': 'url(' + (adoptAdopt$ | async)?.user.userData.avatar + ')'}"></div>
              <md-card-title>
                {{(adoptAdopt$ | async)?.user.userData.firstName}} {{(adoptAdopt$ | async)?.user.userData.lastName}}</md-card-title>
              <md-card-subtitle>
              <span class="pm-font-12 pm-color-gray">
                {{formatDate((adoptAdopt$ | async)?.createdAt)}}
              </span>
              </md-card-subtitle>
            </md-card-header>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="swiper-container" *ngIf="(adoptAdopt$ | async)?.images.length" [swiper]="swiperOptions">
              <div class="swiper-wrapper">
                <div *ngFor="let image of (adoptAdopt$ | async)?.images" class="swiper-slide">
                  <img class="pm-carousel-image" [src]="image.src">
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column column is-10 is-offset-1">
            <div class="pm-details-actions">
              <button md-icon-button class="pm-adopt-share" (click)="onShareClick()">
                <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
              </button>
            </div>
            <br/>
            <md-divider></md-divider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <span class="pm-color-gray pm-font-16">{{(adoptAdopt$ | async)?.description}}</span>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <div class="pm-font-16 pm-color-gray pm-message-label">Comments <i class="mdi mdi-comment-multiple-outline"></i></div>
            <app-adopt-comments [adopt]="adoptAdopt$ | async" *ngIf="adoptAdopt$ | async"></app-adopt-comments>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [`
    .pm-adopt-share {
      margin-left: auto;
    }
    
    .pm-details-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class AdoptDetailsComponent implements OnInit, OnDestroy, IAdoptDetailsComponent {
  // TODO: update attribute name
  adoptAdopt$: Observable<any>;
  adopt: IAdopt;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    loop: true
  };
  private _adoptId: number;
  private _destroyed$ = new Subject<boolean>();
  private _routeListener;
  private _adoptListener;
  constructor(private _store: Store<fromRoot.State>,
              private _activatedRoute: ActivatedRoute,
              private _dialog: MdDialog,
              private _snackBar: MdSnackBar,
              private _utilService: UtilService,
              private _actions$: Actions) {
    this.adoptAdopt$ = _store.select(fromRoot.getAdoptAdopt);
  }

  ngOnInit(): void {
    // TODO: remove listener on destroy
    this._routeListener = this._activatedRoute.params.subscribe((params: Params) => {
      this._adoptId = parseInt(params['adoptId'], 10);
      if (!this._adoptId) {
        // TODO: use global error handling
        throw new Error('AdoptDetailsComponent: adoptId is not defined');
      }
      return this._store.dispatch(new adoptAction.GetByIdAction({adoptId: this._adoptId}));
    });

    this._adoptListener = this.adoptAdopt$.subscribe($event => this.adopt = $event);
  }

  ngOnDestroy(): void {
    this._store.dispatch(new adoptAction.GetByIdClearAction({}));
    this._destroyed$.next(true);
    this._routeListener.unsubscribe();
    this._adoptListener.unsubscribe();
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
            link: `${location.origin}/adopt/${this.adopt.id}/details`,
            picture: this.adopt.images[0].src,
            description: this.adopt.description
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new roomAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }
}
