import { Component, Input } from '@angular/core';
import { IWalker } from '../../models/api';
import { MdDialog } from '@angular/material';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

// TODO: fix stars on mobile firefox
export interface IWalkerComponent {
  onShareClick(): void
}

@Component({
  selector: 'app-walker',
  template: `
    <md-card *ngIf="walker">
      <md-card-header>
        <div md-card-avatar class="pm-cart-avatar"  [ngStyle]="{'background-image': 'url(' + walker.user.userData.avatar + ')'}"></div>
        <md-card-title>{{walker.user.userData.firstName}} {{walker.user.userData.lastName}}</md-card-title>
        <md-card-subtitle>
          <span class="pm-font-12 pm-color-gray">
            {{walker.createdAt | appFormatDate}}
          </span>
        </md-card-subtitle>
        <a md-icon-button class="pm-walker-action-open" [routerLink]="['/walkers', walker.id, 'details']">
          <md-icon class="pm-font-16 pm-color-gray">open_in_new</md-icon>
        </a>
      </md-card-header>
      <md-divider></md-divider><br/>
      <md-card-content [routerLink]="['/walkers', walker.id, 'details']" class="pm-cursor-pointer">
        <!--<img md-card-image [src]="walker.images[0] && walker.images[0].src">-->
        <div class="pm-walker-description pm-font-16 pm-color-gray">{{walker.description | appEllipsis:100}}</div>
      </md-card-content>
      <md-card-actions>
        <div class="pm-walker-footer">
          <span class="pm-font-14 pm-color-gray" *ngIf="walker"><i class="mdi mdi-cash"></i>
            {{ 'price_per_day' | translate:{price: walker.cost} }}</span>&nbsp;
          <rating [ngModel]="walker.averageRating"
                  [max]="5"
                  fullIcon="★"
                  emptyIcon="☆"
                  [readonly]="true"
                  [disabled]="false"
                  [required]="true"
                  [float]="true"
                  [titles]="['Poor', 'Fair', 'Good', 'Very good', 'Excellent']"></rating>
          <button md-icon-button class="pm-walker-action-share" (click)="onShareClick()">
            <md-icon class="pm-font-16 pm-color-gray">share</md-icon>
          </button>
        </div>
      </md-card-actions>
    </md-card>
  `,
  styles: [`
    .walker-card  {}

    md-card-title {
      margin-top: 10px;
    }

    .pm-walker-description {
      margin-bottom: 25px;
    }

    .pm-walker-action-open, .pm-walker-action-share {
      margin-left: auto;
    }

    .pm-walker-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class WalkerComponent implements IWalkerComponent {
  @Input() walker: IWalker;
  constructor(private _dialog: MdDialog, private _store: Store<fromRoot.State>) {

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

          // TODO: shate using dispatch
          FB.ui(fbShareOptions, response => {});
        }
      }
    })
  }
}
