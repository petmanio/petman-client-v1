import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAdopt } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MdDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
// TODO: fix stars on mobile firefox
export interface IAdoptCardComponent {
  formatDate(date): string,
  onShareClick(): void
}

@Component({
  selector: 'app-adopt-card',
  template: `
    <md-card>
      <md-card-header>
        <div md-card-avatar class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + adopt.user.userData.avatar + ')'}"></div>
        <md-card-title>{{adopt.user.userData.firstName}} {{adopt.user.userData.lastName}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-12 pm-color-gray">
            {{formatDate(adopt.createdAt)}}
          </span>
        </md-card-subtitle>
        <a md-icon-button class="pm-adopt-action-open" [routerLink]="['/adopt', adopt.id, 'details']">
          <md-icon class="pm-font-16 pm-color-gray">open_in_new</md-icon>
        </a>
      </md-card-header>
      <md-divider></md-divider><br/>
      <md-card-content [routerLink]="['/adopt', adopt.id, 'details']" class="pm-cursor-pointer">
        <img md-card-image [src]="adopt.images[0] && adopt.images[0].src">
        <div class="pm-adopt-description pm-font-16 pm-color-gray">{{adopt.description | appEllipsis:100}}</div>
        <!--<div class="swiper-container" *ngIf="adopt.images.length" [swiper]="swiperOptions">-->
          <!--<div class="swiper-wrapper">-->
            <!--<div *ngFor="let image of adopt.images" class="swiper-slide">-->
              <!--<img class="pm-carousel-image" [src]="image.src">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-pagination"></div>-->
        <!--</div>-->
      </md-card-content>
      <md-card-actions>
        <div class="pm-adopt-footer">
          <!--<md-icon class="pm-font-16 pm-color-gray">contact_phone</md-icon>&nbsp;-->
          <!--<span class="pm-font-16 pm-color-gray">{{adopt.contactPhone}}</span>-->
          <button md-icon-button class="pm-adopt-action-share" (click)="onShareClick()">
            <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
          </button>
        </div>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    md-card-title {
      margin-top: 10px;
    }

    .pm-adopt-description {
      margin-bottom: 25px;
    }

    .pm-carousel-image {
      height: 300px;
    }

    .swiper-container {
      width: calc(100% + 48px);
      margin: 0 -24px 16px -24px;
    }

    @media (max-width: 600px) {
      .swiper-container {
        width: calc(100% + 32px);
        margin: 16px -16px;
      }
    }

    .pm-adopt-action-open, .pm-adopt-action-share {
      margin-left: auto;
    }

    .pm-adopt-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class AdoptCardComponent implements OnChanges, IAdoptCardComponent {
  @Input() adopt: IAdopt;
  averageRating: number;
  swiperOptions: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 2800 + (Math.random() * 500),
    loop: false
  };
  constructor(private _dialog: MdDialog, private _store: Store<fromRoot.State>) {

  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          const fbShareOptions = {
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
              object : {
                'og:url': `${location.origin}/adopt/${this.adopt.id}/details`,
                'og:title': 'Petman',
                'og:description': this.adopt.description,
                'og:image': this.adopt.images[0].src
              }
            })
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new adoptAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {}

  formatDate(date): string {
    // TODO: use angular date filter
    return UtilService.formatDate(date);
  }
}
