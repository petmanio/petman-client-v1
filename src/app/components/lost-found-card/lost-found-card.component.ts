import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ILostFound } from '../../models/api';
import { UtilService } from '../../services/util/util.service';
import { MdDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

// TODO: fix stars on mobile firefox
export interface ILostFoundCardComponent {
  onShareClick(): void
}

@Component({
  selector: 'app-lost-found-card',
  template: `
    <md-card>
      <md-card-header>
        <div md-card-avatar class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + lostFound.user.userData.avatar + ')'}"></div>
        <md-card-title>{{lostFound.user.userData.firstName}} {{lostFound.user.userData.lastName}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-12 pm-color-gray">
            {{lostFound.createdAt | appFormatDate}}
          </span>
        </md-card-subtitle>
        <a md-icon-button class="pm-lostFound-action-open" [routerLink]="['/lost-found', lostFound.id, 'details']">
          <md-icon class="pm-font-16 pm-color-gray">open_in_new</md-icon>
        </a>
      </md-card-header>
      <md-chip-list *ngIf="lostFound.type">
        <md-chip>
          {{lostFound.type | translate}}</md-chip>
      </md-chip-list>
      <md-divider></md-divider><br/>
      <md-card-content [routerLink]="['/lost-found', lostFound.id, 'details']" class="pm-cursor-pointer">
        <img md-card-image [src]="lostFound.images[0] && lostFound.images[0].src">
        <div class="pm-lostFound-description pm-font-16 pm-color-gray">{{lostFound.description | appEllipsis:100}}</div>
      </md-card-content>
      <md-card-actions>
        <div class="pm-lostFound-footer">
          <!--<md-icon class="pm-font-16 pm-color-gray">contact_phone</md-icon>&nbsp;-->
          <!--<span class="pm-font-16 pm-color-gray">{{lostFound.contactPhone}}</span>-->
          <button md-icon-button class="pm-lostFound-action-share" (click)="onShareClick()">
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

    .pm-lostFound-description {
      margin-bottom: 25px;
    }
    
    md-chip-list {
      margin-bottom: 10px;
      display: block;
      margin-left: auto;
    }

    .pm-carousel-image {
      height: 300px;
    }

    .pm-lostFound-action-open, .pm-lostFound-action-share {
      margin-left: auto;
    }

    .pm-lostFound-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class LostFoundCardComponent implements OnChanges, ILostFoundCardComponent {
  @Input() lostFound: ILostFound;
  averageRating: number;
  constructor(private _dialog: MdDialog, private _store: Store<fromRoot.State>) {

  }

  onShareClick(): void {
    const _dialogRef = this._dialog.open(ShareDialogComponent);
    _dialogRef.afterClosed().subscribe(shareOptions => {
      if (shareOptions) {
        // TODO: create url via router
        if (shareOptions === 'facebook') {
          // const fbShareOptions = {
          //   method: 'share_open_graph',
          //   action_type: 'og.shares',
          //   action_properties: JSON.stringify({
          //     object : {
          //       'og:url': `${location.origin}/lost-found/${this.lostFound.id}/details`,
          //       'og:title': 'Petman',
          //       'og:description': this.lostFound.description,
          //       'og:image': this.lostFound.images[0].src
          //     }
          //   })
          // };

          const fbShareOptions = {
            method: 'share',
            href: `${location.origin}/lost-found/${this.lostFound.id}/details`,
            hashtag: '#Petman'
          };

          // TODO: shate using dispatch
          // this._store.dispatch(new lostFoundAction.ShareOnFacebookAction(fbShareOptions));
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
